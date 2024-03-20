import { Assets } from "../../../Utils/Assets";
import { Elm } from "../../../Utils/Elm";
import { PathObjectLike } from "../../Models/PathObjectLike";
import { FileView } from "./FileView";

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

