import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { DotNetCLIService } from "./DotNetService";
export var DialogResults;
(function (DialogResults) {
    DialogResults[DialogResults["Yes"] = 0] = "Yes";
    DialogResults[DialogResults["No"] = 1] = "No";
    DialogResults[DialogResults["Ok"] = 2] = "Ok";
    DialogResults[DialogResults["Next"] = 3] = "Next";
    DialogResults[DialogResults["Complete"] = 4] = "Complete";
    DialogResults[DialogResults["Abort"] = 5] = "Abort";
    DialogResults[DialogResults["Cancel"] = 6] = "Cancel";
    DialogResults[DialogResults["Back"] = 7] = "Back";
})(DialogResults || (DialogResults = {}));
export class DotNetDialog extends HTMLElement {
    adoptedCallback() {
    }
    disconnectedCallback() {
    }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    connectedCallback() {
        this.render();
    }
    get DialogResult() {
        return this.dialogResult;
    }
    set DialogResult(value) {
        this.dialogResult = value;
        App.Pipe.SendEvent("dialogResultSet", value);
    }
    async ShowDialogAsync() {
        this.querySelector("dialog").showModal();
        return new Promise((resolve, reject) => {
            App.Pipe.Register("dialogResultSet", n => {
                resolve(n);
                this.querySelector("dialog").close();
            });
        });
    }
    async render() {
        const templates = await App.Pipe.Get(DotNetCLIService).GetTemplates();
        Elm.From(this).Swallow(() => [
            new Elm("dialog").Swallow(() => [
                new Elm("div").EatArray(templates, n => new Elm("div").Class("group").Swallow(() => [
                    new Elm("div").Text(n.Name),
                    new Elm("div").Text(n.FullName),
                    new Elm("div").EatArray(n.Languages, n => new Elm("span").Text(n))
                ]))
            ])
        ]);
    }
}
//# sourceMappingURL=DotNetDialog.js.map