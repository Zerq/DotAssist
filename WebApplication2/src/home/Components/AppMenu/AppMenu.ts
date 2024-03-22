import { App } from "../../../Utils/AppPipe";
import { Assets } from "../../../Utils/Assets";
import { Elm } from "../../../Utils/Elm";
import { DotNetCLIService } from "../../Services/DotNetService";

export class AppMenu extends HTMLElement {
    public constructor() {
        super();

    }

    public adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    public disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    public static get observedAttributes(): any {
        return [];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    }

    private versions: Array<string>;

    public connectedCallback() {
        App.Pipe.Get(DotNetCLIService).GetVersions().then(n => {
            n.sort().reverse();
           this.versions = n;
           this.render();

           App.Pipe.SendEvent(App.Commands.SelectedVersion, n[0]);
       });



    }

    private render() {
        this.innerHTML = "";
        this.appendChild(
            new Elm("nav").Swallow(() => [
                new Elm("menu").Swallow(() => [
                    new Elm("li").Swallow(() => [
                        new Elm("img").Attr("src", Assets.AddProject),
                        new Elm("div").Text("New Project")
                    ]).Evt("click", e => {
                        App.Pipe.SendEvent("AppMenuItemClicked", "NewProject");
                    }),
                    new Elm("li").Swallow(() => [
                        new Elm("img").Attr("src", Assets.AddFile),
                        new Elm("div").Text("New File")
                    ]).Evt("click", e => {
                        App.Pipe.SendEvent(App.Commands.AppMenuItemClicked, "NewFile");;
                    }),
                    new Elm("li").Swallow(() => [
                        new Elm("img").Attr("src", Assets.AddFile),
                        new Elm("div").Text("New Directory")
                    ]).Evt("click", e => {
                        App.Pipe.SendEvent(App.Commands.AppMenuItemClicked, "NewDirectory");;
                    }),
                    new Elm("li").Class("noClick").Swallow(() => [
                        new Elm("span").Text("DotNet Version: "),
                        new Elm("select").Id("versionSelected")
                            .Class("custom-select")
                            .Evt("change", e => {
                            const select = <HTMLSelectElement>e.target;
                            App.Pipe.SendEvent(App.Commands.SelectedVersion, select.value);
                        }).EatArray(this.versions, n => new Elm("option").Text(n))
                    ])
                ])
            ]).done()
        );
    }
}