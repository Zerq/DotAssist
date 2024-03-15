import { App } from "./AppPipe";
import { FileSystem } from "./FileSystem";
import { DialogResults } from "./Components/DotNetDialog/DotNetDialog";
export var Stages;
(function (Stages) {
    Stages[Stages["BaseFolderSelector"] = 0] = "BaseFolderSelector";
    Stages[Stages["DotNetTemplate"] = 1] = "DotNetTemplate";
    Stages[Stages["ScriptTemplate"] = 2] = "ScriptTemplate";
    Stages[Stages["StumpSelector"] = 3] = "StumpSelector";
})(Stages || (Stages = {}));
export class Home {
    constructor() {
        this.DirectoryService = new FileSystem();
        this.stage = Stages.BaseFolderSelector;
    }
    async Run() {
        const fileview = document.getElementById("FileView");
        const dotnetDialog = document.querySelector("#dotnet");
        await App.Pipe.Register("AppMenuItemClicked", async (e) => {
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
//# sourceMappingURL=Home.js.map