﻿import { Assets } from "../../../Utils/Assets";
import { Elm } from "../../../Utils/Elm";
import { PathObjectLike } from "../../Models/PathObjectLike";
import { FileView } from "./FileView";

export const RenderDirectories = (directories: Array<PathObjectLike>, fileView: FileView) => {
    Elm.From(fileView).EatArray(directories, n =>
        new Elm("div").Class("group", "dir").Evt("click", () => {
            fileView.setAttribute("path", n.FullPath);
        }).Swallow(() => [
            new Elm("div").Swallow(() => [
                new Elm("img").Attr("src", Assets.Folder)
            ]),
            new Elm("div").Text(`${n.Name}`)
        ])
    );
};