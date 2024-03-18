import { App } from "../../AppPipe";
import { AbortProjectCreation, SelectDotNetTemplate } from "../../DomainCommand";
import { Elm, SubRender } from "../../Elm";
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
     
    protected abstract reset(): void;

    //public static observedAttributes = new Array<string>();  <-- implement on each inheriting class
    public adoptedCallback() { }
    public disconnectedCallback() { }
    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    }
    public connectedCallback() {
        this.FirstRender()
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
                this.reset();
            });
        })
    }
    public abstract Render(): void;
    abstract FirstRender(): Promise<void>;
}

export class TemplateSelector extends SubRender {
    public constructor(
        id: string,
        private templates: Array<Template>,
        private selectedTemplate: string,
        private click?: ()=> void
    ) {
        super(id)
    }

    public Render(): Elm {
        return new Elm("div").Class("Templates").EatArray(this.templates, n =>
            new Elm("div").Class(
                ...(n.Name == this.selectedTemplate ? ["group", "selected"] : ["group"])
            ).Evt("click", e => {
                this.selectedTemplate = n.Name;                  
                this.Refresh();
                this.click();
            }).Swallow(() => [
                new Elm("div").Text(n.Name),
                new Elm("div").Text(n.FullName),
                new Elm("div").EatArray(n.Languages, n => new Elm("span").Class("lang").Text(n))
            ]));
    }
}

export class DotNetDialog extends AbstractDialog {
    protected reset(): void {
        this.selectedTemplate = "";
        this.projectName = "";
        this.templates = new Array<Template>;
            this.FirstRender().then(n => {
        });
    }

    public static observedAttributes = new Array<string>();
 
    public selectedTemplate = "";
    public projectName = "";
    public templates: Array<Template>;


    public constructor() {
        super();
    }

    public async FirstRender() {
        this.templates = await App.Pipe.Get(DotNetCLIService).GetTemplates();
        await this.Render();
    }

    public async Render() {
        this.innerDialog.innerHTML = "";
 
        const validate = () => {
            const completeElm = <HTMLDivElement>document.getElementById("complete");
            const nextElm = <HTMLDivElement>document.getElementById("next");

            if (!this.projectName || !this.selectedTemplate) {
                completeElm.classList.add("disabled");
                nextElm.classList.add("disabled");
            } else {
                completeElm.classList.remove("disabled");
                nextElm.classList.remove("disabled");
            }
        }
        const valid = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789_Backspace";

        const sanitize = (n: KeyboardEvent) => {
            if (n.key === " ") {
                const projName = <HTMLInputElement>n.target;
                const dir = <HTMLInputElement>document.getElementById("projectDir");
                projName.value += "_";
            }

            if (valid.indexOf(n.key) === -1) {
                n.preventDefault();
                return false;
            }

        }
        const changeProjName = (n: KeyboardEvent) => {
            const projName = <HTMLInputElement>n.target;
            this.projectName = projName.value;     
            validate();
        };

 
        const templateSelector = new TemplateSelector("templateSelector", this.templates, this.ariaSelected, validate);

        const abort = (e: Event) => {
            const cmd = new AbortProjectCreation();
            App.Pipe.ExecuteCommand(cmd);
            this.DialogResult = DialogResults.Abort;
        };

        const complete = (e: Event) => {
            const completeElm = <HTMLDivElement>document.getElementById("complete");
      
            if (completeElm.classList.contains("disabled")) { return; }

            const cmd = new SelectDotNetTemplate();
            cmd.ProjectName = this.projectName;
            cmd.TemplateName = this.selectedTemplate;

            console.log(cmd);
            this.DialogResult = DialogResults.Complete;
        };
        const next = (e: Event) => {
            const nextElm = <HTMLDivElement>document.getElementById("next");
            if (nextElm.classList.contains("disabled")) { return; }

            const cmd = new SelectDotNetTemplate();
            cmd.ProjectName = this.projectName;
            cmd.TemplateName = this.selectedTemplate;
            console.log(cmd);

            App.Pipe.ExecuteCommand(cmd);


            this.DialogResult = DialogResults.Next;
        };



        Elm.From(this.innerDialog).Swallow(() => [
            new Elm("header").Text("DotNetCore Templates"),

            Elm.SubRender(templateSelector),

            new Elm("fieldset").Swallow(() => [
                new Elm("legend").Text("File options"),
                new Elm("div").Class("ControlGroup").Swallow(() => [
                    new Elm("span").Text("Project Name: "),
                    new Elm("input")
                        .Id("projectName")
                        .Value(this.projectName)
                        .Evt("keydown", sanitize).Evt("keyup",  changeProjName),
                ])     
            ]),
            new Elm("div").Class("ButtonGroup").Swallow(() => [
                new Elm("button").Text("Abort").Class("AbortButton", "dialogButton")
                    .Evt("click", abort), ,
                new Elm("button").Text("Complete").Class("CompleteButton", "dialogButton", "disabled")
                    .Evt("click", complete).Id("complete"),
                new Elm("button").Text("Next").Class("NextButton", "dialogButton", "disabled")
                    .Evt("click", next).Id("next"),
            ])
        ])

    }
}