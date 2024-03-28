import { App } from "./AppPipe.js";
import { MainView } from "./MainView.js";
import { Panel } from "./Panel.js";
import "./Component/Menu/Menu.js";

((()=> {
    App.Pipe.ShowView(MainView);
})())