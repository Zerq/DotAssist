//import * as signalR from "@microsoft/signalr";

import { Home } from "./Home";
import { AppMenu } from "./Components/AppMenu/AppMenu";
import { FileView } from "./Components/FileViewer/FileView";
import { App } from "./AppPipe";
import { FileSystem } from "./FileSystem";
import { DotNetCLIService } from "./Components/DotNetDialog/DotNetService";
import { DotNetDialog } from "./Components/DotNetDialog/DotNetDialog";

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
