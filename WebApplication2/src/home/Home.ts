import { App } from "./AppPipe";
import { FileView } from "./Components/FileViewer/FileView";
import { FileSystem } from "./FileSystem";
import { BaseFolderSelected, DomainEvent, DotNetTemplateSelected, ProjectCreationCompleted, ProjectSetupAborted } from "./DomainEvent";
import { DialogResults, DotNetDialog } from "./Components/DotNetDialog/DotNetDialog";
import { Stages } from "./Stages";
import { DomainCommand, SelectBaseFolder } from "./DomainCommand";
import { DotNetCLIService } from "./Components/DotNetDialog/DotNetService";
import * as path from "path/win32";

export class Home {
    private fileSystem = new FileSystem();
    public Events: Map<string, DomainEvent>;



    private async ClickNewProject(fileview: FileView, dotnetDialog: DotNetDialog) {

        const path = fileview.getAttribute("path");
        const cmd = new SelectBaseFolder();
        cmd.BaseFolder = path;
        App.Pipe.ExecuteCommand(cmd);
        dotnetDialog.baseDirectory = path;
        const result = await dotnetDialog.ShowDialogAsync();
        if (result === DialogResults.Complete) {
    
        }

    }


    public async Run() {
        const fileview = <FileView>document.getElementById("FileView");
        const dotnetDialog = <DotNetDialog>document.querySelector("#dotnet");

        await App.Pipe.Register<string>("AppMenuItemClicked", async e => {
            switch (e) {
                case "NewProject":
                    await this.ClickNewProject(fileview, dotnetDialog);
                    break;
                case "NewFile":
                    break;
            }
        });

        App.Pipe.Register<DomainCommand>("ExecuteCommand", (e) => {
            const events = e.Execute(); //execute here so i can add in what ever is needed to execute the command...
            events.forEach(e => App.Pipe.SendDomainEvent(e));
        });

        this.handleEvents(fileview);
       






        //const img = document.createElement("img");
        //img.src = Assets.CSharpFile;
        //img.alt = Assets.CSharpFile;
        //img.style.width = "100px";
        //img.style.height = "100px";
        //document.body.appendChild(img);
    }

    private handleEvents(fileView: FileView) {

        let Stage: Stages = Stages.BaseFolderSelector;
        let basefolder = "";


        App.Pipe.HandleDomainEvent(BaseFolderSelected, e => {
            Stage = Stages.DotNetTemplate;
            basefolder = e.BaseFolder;
            

        });
        App.Pipe.HandleDomainEvent(DotNetTemplateSelected, async e => {
            await App.Pipe.Get(DotNetCLIService).MakeProject(
                e.ProjectName,
                e.BaseDirectory,
                e.TemplateName,
                null).then(async () => {          
                    Stage = Stages.ScriptTemplate;
                    const pathObject = await App.Pipe.Get(FileSystem).GetDirectory(e.BaseDirectory);
                    await fileView.Render(pathObject);
                })
     
        });
        App.Pipe.HandleDomainEvent(ProjectCreationCompleted, e => {
            Stage = Stages.BaseFolderSelector;
        });
        App.Pipe.HandleDomainEvent(ProjectSetupAborted, e => {
            Stage = Stages.BaseFolderSelector;
        });
    }
}
