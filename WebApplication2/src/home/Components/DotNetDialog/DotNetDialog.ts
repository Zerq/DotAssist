import { App } from "../../../Utils/AppPipe";
import { AbortProjectCreation, CompleteProjectCreation, SelectDotNetTemplate } from "../../../Commands/DomainCommand";
import { Elm, RefreshToken, SubRender } from "../../../Utils/Elm";
import { DotNetCLIService, Template } from "../../Services/DotNetService";

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
    public baseDirectory = "";
    public templates: Array<Template>;


    public constructor() {
        super();
    }

    private tags: Array<string>;

    public async FirstRender() {
        this.templates = await App.Pipe.Get(DotNetCLIService).GetTemplates();
        const temp = new Map();
        this.templates.forEach(n => {
            n.Tags.forEach(t => {
                let x = t.trim();
                temp.set(x, x);
            });
        })
        this.tags = Array.from(temp.keys());
        this.tags.sort();


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
        const valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_Backspace";

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


        //const templateSelector = new TemplateSelector("templateSelector", this.tags, this.templates, s => this.selectedTemplate = s, () => this.selectedTemplate, validate);
        let selectedCategory = "";
        let selection: Array<Template>
        const HasTag = (t: Template, tag: string) => {
            return t.Tags.filter(n => n.trim().toLowerCase() === tag.trim().toLowerCase()).length > 0;
        };

        const categories = new RefreshToken(() =>
            new Elm("div").Class("Categories").EatArray(this.tags, n =>
                new Elm("div").Text(n).ClassIf("selected", n === selectedCategory)
                    .Evt("click", e => {
                        selectedCategory = n;
                        selection = this.templates.filter((n: Template) =>
                            HasTag(n, selectedCategory));

                        const selected = this.querySelectorAll(".Categories div.selected");

                        if (selected.length === 1)
                            if (selected[0].classList.contains("selected")) {
                                selected[0].classList.remove("selected");
                            }

                        (<HTMLDivElement>e.target).classList.add("selected");


                        //categories.Refresh();
                        temlpateSelector.Refresh();
                    })
            ));





        const temlpateSelector = new RefreshToken(() =>

            new Elm("div").Class("Templates").EatArray(
                selectedCategory ? selection : this.templates, n =>
                new Elm("div").Class(
                    ...(n.Name == this.selectedTemplate ? ["group", "selected"] : ["group"])
                ).Evt("click", e => {
                    this.selectedTemplate = n.Name;
                    temlpateSelector.Refresh();
                    this.click();
                }).Swallow(() => [
                    new Elm("span").Text(n.Name),
                    new Elm("span").Text(n.FullName),
                    new Elm("span").EatArray(n.Languages, n => new Elm("span").Class("lang").Text(n))
                ]))

        );




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
            cmd.BaseDirectory = this.baseDirectory;
            App.Pipe.ExecuteCommand(cmd);

            App.Pipe.ExecuteCommand(new CompleteProjectCreation());

            this.DialogResult = DialogResults.Complete;
        };
        const next = (e: Event) => {
            const nextElm = <HTMLDivElement>document.getElementById("next");
            if (nextElm.classList.contains("disabled")) { return; }

            const cmd = new SelectDotNetTemplate();
            cmd.ProjectName = this.projectName;
            cmd.TemplateName = this.selectedTemplate.trim();
            App.Pipe.ExecuteCommand(cmd);
            this.DialogResult = DialogResults.Next;
        };



        Elm.From(this.innerDialog).Swallow(() => [
            new Elm("header").Text("DotNetCore Templates"),
            new Elm("div").Class("OuterTemplateWrapper").Swallow(() => [
                Elm.Refreshable(categories),
                Elm.Refreshable(temlpateSelector),
            ]),
            new Elm("fieldset").Swallow(() => [

                new Elm("div").Class("ControlGroup").Swallow(() => [
                    new Elm("span").Text("Project Name: "),
                    new Elm("input")
                        .Id("projectName")
                        .Value(this.projectName)
                        .Evt("keydown", sanitize).Evt("keyup", changeProjName),
                ])
            ]),
            new Elm("div").Class("ButtonGroup").Swallow(() => [
                new Elm("button").Text("Abort").Class("AbortButton", "dialogButton")
                    .Evt("click", abort), ,
                new Elm("button").Text("Complete").Class("CompleteButton", "dialogButton", "disabled")
                    .Evt("click", complete).Id("complete"),
                new Elm("button").Html("Next").Class("NextButton", "dialogButton", "disabled")
                    .Evt("click", next).Id("next"),
            ])
        ])

    }
}