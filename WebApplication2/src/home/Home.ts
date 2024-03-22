import { App } from "../Utils/AppPipe";
import { FileView } from "./Components/FileViewer/FileView";
import { FileSystem } from "./Services/FileSystem";
import { BaseFolderSelected, DomainEvent, DotNetTemplateSelected, ProjectCreationCompleted, ProjectSetupAborted } from "../Events/DomainEvent";
import { DotNetDialog } from "./Components/DotNetDialog/DotNetDialog";
import { Stages } from "./Models/Stages";
import { DomainCommand, SelectBaseFolder } from "../Commands/DomainCommand";
import { DotNetCLIService } from "./Services/DotNetService";
import * as path from "path/win32";
import { DialogResults } from "./Models/DialogResults";

export class Home {
    private fileSystem = new FileSystem();
    public Events: Map<string, DomainEvent>;

    private version: string;
    public async Run() {
        const fileview = <FileView>document.getElementById("FileView");
        const dotnetDialog = <DotNetDialog>document.querySelector("#dotnet");

        //need implementing...
        //const newFolderDialog = <NewFolderDialog>document.querySelector("NewFolder");
        //const newFileDialog = <NewFileDialog>document.querySelector("NewFile");
        App.Pipe.Register("AppMenuItemClicked", async e => {
            switch (e) {
                case "NewProject":
                    dotnetDialog.setAttribute("path", fileview.getAttribute("path"));
                    await dotnetDialog.ShowDialogAsync();
                    break;
                case "NewFile":
                    //await newFileDialog.ShowDialgAsync();
                    break;
                case "NewDirectory":
                    //await newFolderDialog.ShowDialogAsync();
                    break;
            }
        });

        App.Pipe.Register(App.Commands.SelectedVersion, (version: string) => {
            dotnetDialog.setAttribute("version", version)
            this.version = version;
        });

        App.Pipe.Register<DomainCommand>("ExecuteCommand", (e) => {
            const events = e.Execute(); //execute here so i can add in what ever is needed to execute the command...
            events.forEach(e => App.Pipe.SendDomainEvent(e));
        });
        this.handleEvents(fileview);
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
