import { Assets, FileLookUp } from "../../../Utils/Assets";
import { Elm } from "../../../Utils/Elm";
import { PathObjectLike } from "../../Models/PathObjectLike";
import { FileView } from "./FileView";
import { formatSize } from "./formatSize";

export const RenderFiles = (files: PathObjectLike[], fileView: FileView) => {
    Elm.From(fileView).EatArray(files, n =>
        new Elm("dir").Class("group").Swallow(() => [
            new Elm("div").Swallow(() => [
                new Elm("img").Attr("src", !FileLookUp.has(n.Extension) ? Assets.File : FileLookUp.get(n.Extension))
            ]),
            new Elm("div").Text(n.Name),
            new Elm("div"),
            new Elm("div").Text(formatSize(n.Size)),
        ])
    );
};