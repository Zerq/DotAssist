import { App } from "../../../Utils/AppPipe";
import { AbortProjectCreation, CompleteProjectCreation, SelectDotNetTemplate } from "../../../Commands/DomainCommand";
import { Elm, RefreshToken, SubRender } from "../../../Utils/Elm";
import { DotNetCLIService, TemplateType } from "../../Services/DotNetService";
import { DialogResults } from "../../Models/DialogResults";
import { Template } from "../../Models/Template";

export class DotNetDialog extends HTMLElement {
    public constructor() {
        super();
        this.innerDialog = document.createElement("dialog");
        this.append(this.innerDialog);
    }
    protected innerDialog: HTMLDialogElement;
    private selectedTemplate = "";
    private selectedLanguage = "";
    private projectName = "";
    private baseDirectory = "";
    private templates: Array<Template>;

    private tags: Array<string>;

    public version: string;

    protected reset(): void {
        this.selectedTemplate = "";
        this.projectName = "";
        this.templates = new Array<Template>;
        this.FirstRender().then(n => {
        });
    }

    public static observedAttributes: Array<string> = [
        "version", "path"
    ];

    public adoptedCallback() { }

    public disconnectedCallback() { }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "version") {
            this.version = newValue;

            if (this.baseDirectory) {
                this.FirstRender()
            }
        }

        if (name === "path") {
            this.baseDirectory = newValue;

            if (this.version) {
                this.FirstRender()
            }
        }
    }

    public connectedCallback() {

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

    public async FirstRender() {
        this.templates = await App.Pipe.Get(DotNetCLIService).GetTemplates(this.version, TemplateType.project);
        const temp = new Map();
        this.templates.forEach(n => {
            n.classifications.forEach(t => {
                temp.set(t, t);
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
        let selectedLanguage = "";
        let selection: Array<Template>

        const HasTag = (t: Template, tag: string) => {
            return t.classifications.filter(n => n === tag).length > 0;
        };

        const getShortName = (s: string) => {
            let shortName = s;
            if (Object.getPrototypeOf(s) === "[]") {
                shortName = s[0];
            }
            return shortName;
        }

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
            new Elm("div")
                .Class("Templates")
                .EatAndGroup(
                    selectedCategory ? selection : this.templates,
                    n => n.tags?.language,
                    n => n.name + n.description,
                    (variablePart, constantPart) =>
                        new Elm("article").Class(
                            ...(getShortName(constantPart.shortName) == this.selectedTemplate ? ["group", "selected"] : ["group"])
                        )
                            .Attr("data-shortName", getShortName(constantPart.shortName))
                            .Swallow(() => [
                                new Elm("header").Class("templateName").Swallow(() => [
                                    new Elm("h4").Text(constantPart.name)
                                ]),
                                new Elm("p").Class("templateDescription").Text(constantPart.description),
                                new Elm("ul").EatArray(variablePart, n =>
                                    new Elm("li").Evt("click", e => {
                                        this.selectedTemplate = getShortName(constantPart.shortName);
                                        this.selectedLanguage = n;
                                        temlpateSelector.Refresh();
                                    }).Swallow(() => [
                                        new Elm("span").ClassIf("selected", this.selectedLanguage === n).Text(n)
                                    ])
                                )
                            ]
                            )
                )

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
            new Elm("div").Class("dialogWrapper").Swallow(() => [
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
        ])

    }
}