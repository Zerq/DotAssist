import { Elm } from "../../Elm";
import { Assets } from "../../Assets";
import { formatSize } from "./formatSize";
export const RenderDrives = (drives, fileView) => {
    Elm.From(fileView).EatArray(drives, n => new Elm("dir").Class("group", "dir").Evt("click", () => {
        fileView.setAttribute("path", n.FullPath);
    }).Swallow(() => [
        new Elm("div").Swallow(() => [
            new Elm("img").Attr("src", Assets.Folder)
        ]),
        new Elm("div").Text(`${n.Name}`),
        new Elm("div").Text(n.Description ?? ""),
        new Elm("div").Text(formatSize(n.Size)),
    ]));
};
//# sourceMappingURL=RenderDrives.js.map