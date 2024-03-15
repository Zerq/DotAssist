import { App } from "../../AppPipe";
import { Elm } from "../../Elm";
import { FileSystem } from "../../FileSystem";
import { PathType } from "../../PathType";
import { RenderDirectories } from "./RenderDirectories";
import { RenderDrives } from "./RenderDrives";
import { RenderFiles } from "./RenderFiles";
import { RenderParent } from "./RenderParent";
export class FileView extends HTMLElement {
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
        return ["path"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "path") {
            const pathItem = App.Pipe.Get(FileSystem).GetDrives(newValue).then(n => {
                this.Render(n);
                App.Pipe.SendEvent("FilePathChanged", newValue);
            });
        }
    }
    connectedCallback() {
        if (this.hasAttribute("path")) {
            const newValue = this.getAttribute("path");
            const pathItem = App.Pipe.Get(FileSystem).GetDrives(newValue).then(n => {
                this.Render(n);
            });
        }
    }
    async Render(dir) {
        this.innerHTML = "";
        this.appendChild(new Elm("div").Text(dir.FullPath.toUpperCase()).Class("PathDisplay").done());
        if (dir.PathType === PathType.Drive) {
            RenderDrives(dir.Drives, this);
            RenderDirectories(dir.Directories, this);
            RenderFiles(dir.Files, this);
        }
        else {
            //render parent
            RenderParent(dir.Parent, this);
            RenderDirectories(dir.Directories, this);
            RenderFiles(dir.Files, this);
        }
    }
}
//# sourceMappingURL=FileView.js.map