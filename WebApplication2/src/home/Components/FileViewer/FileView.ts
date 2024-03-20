import { App } from "../../../Utils/AppPipe";
import { Elm } from "../../../Utils/Elm";
import { Assets } from "../../../Utils/Assets";
import { FileSystem } from "../../Services/FileSystem";
import { PathObjectLike } from "../../Models/PathObjectLike";
import { PathType } from "../../Models/PathType";
import { RenderDirectories } from "./RenderDirectories";
//import { RenderDrives } from "./RenderDrives";
import { RenderFiles } from "./RenderFiles";
import { RenderParent } from "./RenderParent";



export class FileView extends HTMLElement {
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

    public static get observedAttributes() {
        return ["path"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "path") {

            const pathItem = App.Pipe.Get(FileSystem).GetDirectory(newValue).then(n => {
                this.Render(n);
                App.Pipe.SendEvent("FilePathChanged", newValue);
            });        
        }   
    }

    public connectedCallback() {
        if (this.hasAttribute("path")) {
            const newValue = this.getAttribute("path");
            const pathItem = App.Pipe.Get(FileSystem).GetDirectory(newValue).then(n => {
                this.Render(n);
            });  
        }
    }

 


    public async Render(dir: PathObjectLike) {
        this.innerHTML = "";

        this.appendChild(new Elm("div").Text(dir.FullPath.toUpperCase()).Class("PathDisplay").done());

        if (dir.PathType === PathType.Drive) {
           // RenderDrives(dir.Drives, this);
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
