# -*- coding: utf-8 -*-
import os
import sys
import re
import json
import markdown
import string
import shutil

class Menu:
    path = ""
    title = ""
    list = []

def formulaEscape(formula):
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

def createNote(data, template):
    formula = re.findall(r"\$\$?[^$]+\$\$?", data)
    for f in range(len(formula)):
        data = data.replace(formula[f], "{{$%d}}" % (f,))
    coverRes = re.search(r"!\[[^\]]+\]\(([^\)]+)\)", data)
    cover = "/assets/homepage_banner.jpg"
    if coverRes is not None:
        cover = coverRes.group(1)
    content = markdown.markdown(data, extensions=[
                                "markdown.extensions.toc", "markdown.extensions.fenced_code", "markdown.extensions.tables"])
    for f in range(len(formula)):
        content = content.replace("{{$%d}}" % (f,), formulaEscape(formula[f]))
    titleRes = re.search(r">([^<]+)<", content)
    title = ""
    if titleRes is not None:
        title = titleRes.group(1)
    res = template.replace("{{content}}", content).replace("{{title}}", title).replace("{{cover}}", cover)
    return res, title


def convert(source, dest, path, template):
    subPathList = os.listdir(source + path)
    menuList = []
    menu = {"list": []}
    menu["path"] = path
    for fileName in subPathList:
        if os.path.isfile(source + path + fileName):
            if fileName.startswith("__") or fileName.startswith("$") or fileName.startswith("~"):
                continue
            elif fileName.endswith(".md"):
                with open(source + path + fileName, "r", encoding="utf-8") as f:
                    s, title = createNote(f.read(), template)
                    menu["list"].append([fileName.replace(".md", ""), title])
                with open(dest + path + fileName.replace(".md", ".html"), "w", encoding="utf-8") as f:
                    f.write(s)
            else:
                if fileName == "title.txt":
                    with open(source + path + fileName, "r", encoding="utf-8") as f:
                        menu["title"] = f.read()
                else:
                    shutil.copyfile(source + path + fileName, dest + path + fileName)
        elif os.path.isdir(source + path + fileName):
            os.mkdir(dest + path + fileName)
            menuList = menuList + convert(source, dest, path + fileName + "/", template)
    chapterLength = len(menu["list"])
    if chapterLength:
        menuList.append(menu)
        for idx, fileInfo in enumerate(menu["list"]):
            fileName = fileInfo[0]
            chapterTitle = fileInfo[1]
            filePath = dest + path + fileName + ".html"
            if idx > 0:
                lastChapter = menu["list"][idx - 1]
                lastChapterFileName = lastChapter[0]
                lastChapterTitle = "上一章：" + lastChapter[1]
                lastAction = "onclick=\"toChapter('%s')\"" % (lastChapterFileName + ".html",)
            else:
                lastChapterTitle = "已经是第一章"
                lastAction = "disabled"
            if idx < chapterLength - 1:
                nextChapter = menu["list"][idx + 1]
                nextChapterFileName = nextChapter[0]
                nextChapterTitle = "下一章：" + nextChapter[1]
                nextAction = "onclick=\"toChapter('%s')\"" % (nextChapterFileName + ".html",)
            else:
                nextChapterTitle = "已经是最后一章"
                nextAction = "disabled"

            with open(filePath, "r", encoding="utf-8") as f:
                s = f.read()
            s = s.replace("{{laction}}", lastAction).replace("{{ltitle}}", lastChapterTitle)
            s = s.replace("{{naction}}", nextAction).replace("{{ntitle}}", nextChapterTitle)
            with open(filePath, "w", encoding="utf-8") as f:
                f.write(s)

    return menuList

def genMenu(menuList):
    big_template = """
    <div class="mdui-panel-item">
        <div class="mdui-panel-item-header">
            <i class="mdui-icon material-icons">book</i>
            {{$1}}
        </div>
        <div class="mdui-panel-item-body">
            <div class="mdui-list" data-path="{{$2}}">
            {{$3}}
            </div>
        </div>
    </div>
    """
    small_template = """
    <a href="javascript:void(0);" class="mdui-list-item mdui-ripple" data-path="{{$1}}" onclick="openNote(this);">{{$2}}</a>
    """
    res = ""
    for i in menuList:
        s = ""
        for j in i["list"]:
            s += small_template.replace("{{$1}}", j[0]).replace("{{$2}}", j[1])
        res += big_template.replace("{{$1}}", i["title"]).replace("{{$2}}", i["path"]).replace("{{$3}}", s)
    return res

if __name__ == "__main__":
    argList = sys.argv
    source_path = "./note_source/"
    dest_path = "./note/"
    template_file = "./reader.html"
    homepage_template_file = "./index_template.html"
    if len(argList) >= 2:
        source_path = argList[1]
    if len(argList) >= 3:
        dest_path = argList[2]
    if len(argList) >= 4:
        template_file = argList[3]
    with open(template_file, "r", encoding="utf-8") as f:
        template = f.read()
    shutil.rmtree(dest_path)
    os.mkdir(dest_path)
    menuList = convert(source_path, dest_path, "", template)
    with open(homepage_template_file, "r", encoding="utf-8") as f:
        homepage_template = f.read()
    homepage = homepage_template.replace("{{menu}}", genMenu(menuList))
    with open("./index.html", "w", encoding="utf-8") as f:
        f.write(homepage)