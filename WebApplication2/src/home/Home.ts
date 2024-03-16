import { App } from "../Components/Util/AppPipe.js";
import { FileView } from "../Components/FileViewer/FileView.js";
import { FileSystem } from "../Services/FileSystem.js";
import { DialogResults, DotNetDialog } from "../Components/DotNetDialog/DotNetDialog.js";
import { DomainEvent } from "./DomainEvent.js";
import { Stages } from "./Stages.js";
import { Elm } from "../Components/Util/Elm.js";

export class Home {
    private DirectoryService = new FileSystem();
    public Events: Map<string, DomainEvent>;
    public stage: Stages = Stages.BaseFolderSelector;

    public async Run() {
        const fileview = document.getElementById("FileView");
        const dotnetDialog = <DotNetDialog>document.querySelector("#dotnet");

        Elm.From(document.head).Swallow(() => [
            new Elm("link").Attr("rel", "stylesheet").Attr("href", `${location.origin}/home/home.css`)
        ]);

        await App.Pipe.Register<string>("AppMenuItemClicked", async e => {
            switch (e) {
                case "NewProject":
                    const path = fileview.getAttribute("path");
                    const x = 0;
                    const result = await dotnetDialog.ShowDialogAsync();
                    if (result === DialogResults.Complete) {
                        alert("complete");
                    }

                    break;
                case "NewFile":
             

                    break;
            }
        });
       
 
        //const img = document.createElement("img");
        //img.src = Assets.CSharpFile;
        //img.alt = Assets.CSharpFile;
        //img.style.width = "100px";
        //img.style.height = "100px";
        //document.body.appendChild(img);
    }
}
