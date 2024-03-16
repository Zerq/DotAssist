import { App } from "../Util/AppPipe.js";
import { Elm } from "../Util/Elm.js";
import { Assets } from "../../assets/Assets.js";
import { FileView } from "./FileView.js";
import { PathObjectLike } from "../../Home/PathObjectLike.js";

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