import { Elm } from "../Util/Elm.js";
import { Assets, FileLookUp } from "../../assets/Assets.js";
import { FileView } from "./FileView.js";
import { formatSize } from "./formatSize.js";
import { PathObjectLike } from "../../Home/PathObjectLike.js";

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
