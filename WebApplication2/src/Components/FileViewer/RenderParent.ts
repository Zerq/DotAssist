import { App } from "../Util/AppPipe.js";
import { Elm } from "../Util/Elm.js";
import { Assets } from "../../assets/Assets.js";
import { FileView } from "./FileView.js";
import { PathObjectLike } from "../../Home/PathObjectLike.js";

export const RenderParent = (parent: PathObjectLike, fileView: FileView) => {
    Elm.From(fileView).Swallow(() => [
        new Elm("div").Class("group", "dir")
            .Evt("click", () => {
                fileView.setAttribute("path", parent.FullPath);
            }).Swallow(() => [
                new Elm("div").Swallow(() => [
                    new Elm("img").Attr("src", Assets.FolderBack)
                ]),
                new Elm("div").Text("..")
            ])
    ]);
};

