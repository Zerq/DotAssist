import { Elm } from "../../Elm";
import { Assets } from "../../Assets";
export const RenderDirectories = (directories, fileView) => {
    Elm.From(fileView).EatArray(directories, n => new Elm("div").Class("group", "dir").Evt("click", () => {
        fileView.setAttribute("path", n.FullPath);
    }).Swallow(() => [
        new Elm("div").Swallow(() => [
            new Elm("img").Attr("src", Assets.Folder)
        ]),
        new Elm("div").Text(`${n.Name}`)
    ]));
};
//# sourceMappingURL=RenderDirectories.js.map