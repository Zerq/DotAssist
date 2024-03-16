import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { DotNetCLIService, Template } from "./DotNetService";

export enum DialogResults {
Yes, No, Ok, Next, Complete, Abort, Cancel, Back
}
export abstract class AbstractDialog extends HTMLElement {
    public constructor() {
        super();
        this.innerDialog = document.createElement("dialog");
        this.append(this.innerDialog);
    }
    protected innerDialog: HTMLDialogElement;

    //public static observedAttributes = new Array<string>();  <-- implement on each inheriting class
    public adoptedCallback() { }
    public disconnectedCallback() {}
    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    }
    public connectedCallback() {
        this.render()
    }

    private dialogResult: DialogResults;
    public get DialogResult() {
        return this.dialogResult;
    }
    public set DialogResult(value: DialogResults) {
        this.dialogResult = value;
        App.Pipe.SendEvent("dialogResultSet", value);
    }
    public async ShowDialogAsync(): Promise<DialogResults> {
        this.querySelector("dialog").showModal();
        return new Promise<DialogResults>((resolve, reject) => {
            App.Pipe.Register<DialogResults>("dialogResultSet", n => {
                resolve(n);
                this.querySelector("dialog").close();
            });
        })
    }
    public abstract render(): void;
}

export class DotNetDialog extends AbstractDialog {
    public static observedAttributes = new Array<string>(); 
    public selectedTemplate: string;
    public async render() {
    
        const templates = await App.Pipe.Get(DotNetCLIService).GetTemplates();

        this.innerDialog.innerHTML = "";

        Elm.From(this.innerDialog).Swallow(() => [
                new Elm("header").Text("DotNetCore Templates"),
                new Elm("div").Class("Templates").EatArray(templates, n =>
                    new Elm("div").Class(
                        ...(n.Name == this.selectedTemplate ? ["group", "selected"] : ["group"])
                    ).Evt("click", e => {
                        this.selectedTemplate = n.Name;
                        this.render();
                    }).Swallow(() => [
                    new Elm("div").Text(n.Name),
                    new Elm("div").Text(n.FullName),
                    new Elm("div").EatArray(n.Languages, n => new Elm("span").Text(n))
                ])),
                new Elm("fieldset").Swallow(() => [
                    new Elm("legend").Text("File options"),
                    new Elm("div").Class("ControlGroup").Swallow(() => [
                        new Elm("span").Text("Project Name: "),
                        new Elm("input"),
                    ]),
                    new Elm("div").Class("ControlGroup").Swallow(() => [
                        new Elm("span").Text("Create Folder: "),
                        new Elm("input").Attr("type", "checkbox")
                    ]),
                    new Elm("div").Class("ControlGroup").Swallow(() => [
                        new Elm("span").Text("Project Folder: "),
                        new Elm("input"),
                    ]),
                ]),
                new Elm("div").Class("ButtonGroup").Swallow(() => [
                    new Elm("button").Text("Abort").Class("AbortButton", "dialogButton"),
                    new Elm("button").Text("Complete").Class("CompleteButton", "dialogButton"),
                    new Elm("button").Text("Next").Class("NextButton", "dialogButton"),
                ]) 
            ])
    
    }
}