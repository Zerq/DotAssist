import { App } from "../Util/AppPipe.js";
import { Elm } from "../Util/Elm.js";
import { Assets } from "../../assets/Assets.js";
import { FileView } from "./FileView.js";
import { formatSize } from "./formatSize.js";
import { PathObjectLike } from "../../Home/PathObjectLike.js";

export const RenderDrives = (drives: Array<PathObjectLike>, fileView: FileView) => {
    Elm.From(fileView).EatArray(drives, n =>
        new Elm("dir").Class("group", "dir").Evt("click", () => {
            fileView.setAttribute("path", n.FullPath);
        }).Swallow(() => [
            new Elm("div").Swallow(() => [
                new Elm("img").Attr("src", Assets.Drive)
            ]),

            new Elm("div").Text(`${n.Name}`),
            new Elm("div").Text(n.Description ?? ""),
            new Elm("div").Text(formatSize(n.Size)),
        ])
    );
};