//import * as signalR from "@microsoft/signalr";

import { AppMenu } from "./Components/AppMenu/AppMenu.js";
import { FileView } from "./Components/FileViewer/FileView.js";
import { App } from "./Components/Util/AppPipe.js";
import { FileSystem } from "./Services/FileSystem.js";
import { DotNetCLIService } from "./Services/DotNetService.js";
import { DotNetDialog } from "./Components/DotNetDialog/DotNetDialog.js";
import { Home } from "./Home/Home.js";

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
