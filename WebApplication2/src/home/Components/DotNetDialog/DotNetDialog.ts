import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { DotNetCLIService, Template } from "./DotNetService";

export enum DialogResults {
Yes, No, Ok, Next, Complete, Abort, Cancel, Back
}

export class DotNetDialog extends HTMLElement {
    public adoptedCallback() {
    }

    public disconnectedCallback() {
    }

    public static get observedAttributes(): Array<string> {
        return [];
    }

 

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
 
    }

    public connectedCallback() {
        this.render();
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

    public async render() {
        const templates = await App.Pipe.Get(DotNetCLIService).GetTemplates();
        Elm.From(this).Swallow(() => [
            new Elm("dialog").Swallow(() => [
                new Elm("div").EatArray(templates, n => new Elm("div").Class("group").Swallow(() => [
                    new Elm("div").Text(n.Name),
                    new Elm("div").Text(n.FullName),
                    new Elm("div").EatArray(n.Languages, n => new Elm("span").Text(n))
                ]
                ))
           
            ])

        ]);
    }
}