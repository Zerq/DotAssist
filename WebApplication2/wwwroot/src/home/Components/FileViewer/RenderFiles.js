import { Elm } from "../../Elm";
import { Assets, FileLookUp } from "../../Assets";
import { formatSize } from "./formatSize";
export const RenderFiles = (files, fileView) => {
    Elm.From(fileView).EatArray(files, n => new Elm("dir").Class("group").Swallow(() => [
        new Elm("div").Swallow(() => [
            new Elm("img").Attr("src", !FileLookUp.has(n.Extension) ? Assets.File : FileLookUp.get(n.Extension))
        ]),
        new Elm("div").Text(n.Name),
        new Elm("div"),
        new Elm("div").Text(formatSize(n.Size)),
    ]));
};
//# sourceMappingURL=RenderFiles.js.map