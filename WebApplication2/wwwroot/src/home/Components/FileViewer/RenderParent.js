import { Elm } from "../../Elm";
import { Assets } from "../../Assets";
export const RenderParent = (parent, fileView) => {
    Elm.From(fileView).Swallow(() => [
        new Elm("div").Class("group", "dir")
            .Evt("click", () => {
            fileView.setAttribute("path", parent.FullPath);
        }).Swallow(() => [
            new Elm("div").Swallow(() => [
                new Elm("img").Attr("src", Assets.Folder)
            ]),
            new Elm("div").Text("..")
        ])
    ]);
};
//# sourceMappingURL=RenderParent.js.map