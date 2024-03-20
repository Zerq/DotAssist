export class Assets {
    public static Console = require("../assets/console.png");
    public static Folder = require("../assets/folder.png");
    public static FolderBack = require("../assets/folderback.png");
    public static Drive = require("../assets/drive.png");

    public static Globe = require("../assets/globe.png");
    public static Lib = require("../assets/lib.png");
    public static WinForm = require("../assets/winform.png");

    public static AddFile = require("../assets/plusfile.png");
    public static AddProject = require("../assets/plusProj.png");

    public static File = require("../assets/basicFile.png");
    public static CSharpFile = require("../assets/c#.png");
    public static HtmlFile = require("../assets/htmlfile.png");
    public static JavaScriptFile = require("../assets/jsfile.png");
    public static JsonFile = require("../assets/jsonfile.png");

    public static ProjectFile = require("../assets/projFile.png");
    public static SolutionFile = require("../assets/slnFile.png");
}

export const FileLookUp: Map<string, string> = new Map([
    [".cs", Assets.CSharpFile],
    [".html", Assets.HtmlFile],
    [".htm", Assets.HtmlFile],
    [".js", Assets.JavaScriptFile],
    [".json", Assets.JsonFile],
    [".csproj", Assets.ProjectFile],
    [".sln", Assets.SolutionFile]
]);