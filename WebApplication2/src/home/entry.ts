import { Home } from "./Home";
import { AppMenu } from "./Components/AppMenu/AppMenu";
import { FileView } from "./Components/FileViewer/FileView";
import { FileSystem } from "./Services/FileSystem";
import { DotNetCLIService } from "./Services/DotNetService";
import { DotNetDialog } from "./Components/DotNetDialog/DotNetDialog";
import { App } from "../Utils/AppPipe";

(function () {
    App.Pipe.Set(FileSystem);
    App.Pipe.Set(DotNetCLIService);
    customElements.define("file-viewer", FileView);
    customElements.define("app-menu", AppMenu);
    customElements.define("dotnet-dialog", DotNetDialog)
    new Home().Run().then(() => {
        console.log("done");
    });
}());
