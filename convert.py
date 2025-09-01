# -*- coding: utf-8 -*-
import os
import sys
import re
import json
import markdown
import shutil
from typing import Any, List, Tuple, Iterable, Dict, Mapping, Callable, Union, Optional


class Menu:
    path = ""
    title = ""
    list = []


class Chapter:
    fname: str = ""
    title: str = ""
    content: str = ""
    prev: 'Chapter' = None
    next: 'Chapter' = None
    def __init__(self, fname: str, title: str, content: str) -> None:
        self.fname = fname
        self.title = title
        self.content = content


def formula_escape(formula: str) -> str:
    table = {
        "α": "\\alpha", "β": "\\beta", "Γ": "\\Gamma", "γ": "\\gamma",
        "Δ": "\\Delta", "δ": "\\delta", "ε": "\\varepsilon", "ζ": "\\zeta",
        "η": "\\eta", "Θ": "\\Theta", "θ": "\\theta", "ι": "\\iota",
        "κ": "\\kappa", "Λ": "\\Lambda", "λ": "\\lambda", "μ": "\\mu",
        "ν": "\\nu", "Ξ": "\\Xi", "ξ": "\\xi", "ο": "\\omicron",
        "Π": "\\Pi", "π": "\\pi", "ρ": "\\rho", "Σ": "\\Sigma",
        "σ": "\\sigma", "τ": "\\tau", "Υ": "\\Upsilon", "υ": "\\upsilon",
        "Φ": "\\Phi", "φ": "\\varphi", "ϕ": "\\varphi", "χ": "\\chi",
        "Ψ": "\\Psi", "ψ": "\\psi", "Ω": "\\Omega", "ω": "\\omega",
        "<": "&lt;", ">": "&gt;"
    }
    for alphabet in table:
        formula = formula.replace(alphabet, table[alphabet] + " ")
    return formula


def create_note(data: str, template: str) -> Tuple[str, str]:
    formula = re.findall(r"\$\$?[^$]+\$\$?", data)
    for f in range(len(formula)):
        data = data.replace(formula[f], "{{$%d}}" % (f,))
    coverRes = re.search(r"!\[[^\]]+\]\(([^\)]+)\)", data)
    cover = "/assets/homepage_banner.jpg"
    if coverRes is not None:
        cover = coverRes.group(1)
    content = markdown.markdown(
        data,
        extensions = [
            "markdown.extensions.toc",
            "markdown.extensions.fenced_code",
            "markdown.extensions.tables"
        ]
    )
    for f in range(len(formula)):
        content = content.replace("{{$%d}}" % (f,), formula_escape(formula[f]))
    titleRes = re.search(r">([^<]+)<", content)
    title = ""
    if titleRes is not None:
        title = titleRes.group(1)
    res = template.replace("{{content}}", content).replace("{{title}}", title).replace("{{cover}}", cover)
    return res, title


def page_btn(chapters: List[Chapter]) -> List[Chapter]:
    chapter_len = len(chapters)
    action = lambda fname: "onclick=\"toChapter('%s')\"" % (fname + ".html",)
    for idx, chapter in enumerate(chapters):
        content = chapter.content

        is_first = (idx == 0)
        if not is_first:
            left_action = action(chapters[idx - 1].fname)
            left_title = chapters[idx - 1].title
        else:
            left_action = "disabled"
            left_title = "-"
        content = content.replace("{{laction}}", left_action).replace("{{ltitle}}", left_title)

        is_last = (idx == chapter_len - 1)
        if not is_last:
            right_action = action(chapters[idx + 1].fname)
            right_title = chapters[idx + 1].title
        else:
            right_action = "disabled"
            right_title = "-"
        content = content.replace("{{naction}}", right_action).replace("{{ntitle}}", right_title)

        chapter.content = content
    
    return chapters


def homepage_menu(path: str, title: str, chapters: List[Chapter], templates: Dict[str, str]) -> str:
    menu_items = ""
    for chapter in chapters:
        menu_item = templates["menu_item"].replace("{{fname}}", chapter.fname).replace("{{title}}", chapter.title)
        menu_items += menu_item
    res = templates["menu"].replace("{{path}}", path).replace("{{title}}", title).replace("{{chapters}}", menu_items)
    return res


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", type = str, default = "config.json", help = "Config file.")
    args = parser.parse_args()
    with open(args.c, "r", encoding = "utf-8") as f:
        config = json.load(f)
    sources = config["sources"]
    templates = config["templates"]
    for key, template in templates.items():
        if os.path.isfile(template):
            with open(template, "r", encoding = "utf-8") as f:
                templates[key] = f.read()
    
    menu = ""
    for source in sources:
        source_path = source["path"]
        dest_path = source["dest"]
        title = source["title"]
        if os.path.isfile(source_path): # 如果源是文件
            pass
        elif os.path.isdir(source_path): # 如果源是目录
            if os.path.isdir(dest_path):
                shutil.rmtree(dest_path)
            os.makedirs(dest_path, exist_ok = True)
            fnames = sorted(os.listdir(source_path), key = lambda x: int((lambda s: s if len(s) else '-1')(''.join(filter(str.isdigit, x)))))
            chapters = []
            
            for fname in fnames:
                src = os.path.join(source_path, fname)
                dest = os.path.join(dest_path, fname)
                if os.path.isdir(src) and src.endswith("assets"): # 资源文件夹
                    shutil.copytree(src, dest)
                if os.path.isfile(src) and src.endswith(".md"): # 笔记
                    with open(src, "r", encoding = "utf-8") as f:
                        chapter_content, chapter_title = create_note(f.read(), templates["reader"])
                        chapters.append(Chapter(fname.replace(".md", ""), chapter_title, chapter_content))
            
            chapters = page_btn(chapters)

            for chapter in chapters:
                with open(os.path.join(dest_path, chapter.fname + ".html"), "w", encoding = "utf-8") as f:
                    f.write(chapter.content)
        
        menu += homepage_menu(dest_path, title, chapters, templates)

    homepage = templates["index"].replace("{{menu}}", menu)
    with open("index.html", "w", encoding = "utf-8") as f:
        f.write(homepage)