import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { Assets } from "../../Assets";
export class AppMenu extends HTMLElement {
    constructor() {
        super();
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = "";
        this.appendChild(new Elm("nav").Swallow(() => [
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
                    App.Pipe.SendEvent("AppMenuItemClicked", "NewFile");
                    ;
                }),
            ])
        ]).done());
    }
}
//# sourceMappingURL=AppMenu.js.map