export class Assets {
    public static Console = location.origin + "/assets/console.png";
    public static Folder = location.origin + "/assets/folder.png";
    public static FolderBack = location.origin + "/assets/folderback.png";
    public static Drive = location.origin + "/assets/drive.png";
    public static Globe = location.origin + "/assets/globe.png";
    public static Lib = location.origin + "/assets/lib.png";
    public static WinForm = location.origin + "/assets/winform.png";
    public static AddFile = location.origin + "/assets/plusfile.png";
    public static AddProject = location.origin + "/assets/plusProj.png";
    public static File = location.origin + "/assets/basicFile.png";
    public static CSharpFile = location.origin + "/assets/c#.png";
    public static HtmlFile = location.origin + "/assets/htmlfile.png";
    public static JavaScriptFile = location.origin + "/assets/jsfile.png";
    public static JsonFile = location.origin + "/assets/jsonfile.png";
    public static ProjectFile = location.origin + "/assets/projFile.png";
    public static SolutionFile = location.origin + "/assets/slnFile.png";
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