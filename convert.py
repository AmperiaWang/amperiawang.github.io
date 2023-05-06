# -*- coding: utf-8 -*-
import os
import sys
import re
import markdown
import string
import shutil


def createNote(data, template):
    content = markdown.markdown(data, extensions=[
                                'markdown.extensions.toc', 'markdown.extensions.fenced_code', 'markdown.extensions.tables'])
    titleRes = re.search(r">([^<]+)<", content)
    title = ""
    if titleRes is not None:
        title = titleRes.group(1)
    res = template.replace("{{content}}", content).replace("{{title}}", title)

    return res


def convert(source, dest, path, template):
    subPathList = os.listdir(source + path)
    for fileName in subPathList:
        if os.path.isfile(source + path + fileName):
            if fileName.endswith(".md"):
                with open(source + path + fileName, "r", encoding="utf-8") as f:
                    s = createNote(f.read(), template)
                with open(dest + path + fileName.replace(".md", ".html"), "w", encoding="utf-8") as f:
                    f.write(s)
            else:
                shutil.copyfile(source + path + fileName,
                                dest + path + fileName)
        elif os.path.isdir(source + path + fileName):
            os.mkdir(dest + path + fileName)
            convert(source, dest, path + fileName + "/", template)


if __name__ == "__main__":
    argList = sys.argv
    source_path = "./note_source/"
    dest_path = "./note/"
    template_file = "./reader.html"
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
    convert(source_path, dest_path, "", template)
