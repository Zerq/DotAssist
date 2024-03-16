import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { Assets } from "../../Assets";
import { PathObjectLike } from "../../PathObjectLike";
import { FileView } from "./FileView";
import { formatSize } from "./formatSize";

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