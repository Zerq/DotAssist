//import { Assets } from "./Assets";
//import { DirectoryService } from "./DirectoryService";
//import { PathObjectLike } from "./PathObjectLike";
//import { PathType } from "./PathType";

//export class FileView {
//    public constructor(private fileViewElement: HTMLTableElement, private directoryService: DirectoryService) {
//    }

//    private fileLookUp: Map<string, string> = new Map([
//        [".cs", Assets.CSharpFile],
//        [".html", Assets.HtmlFile],
//        [".htm", Assets.HtmlFile],
//        [".js", Assets.JavaScriptFile],
//        [".json", Assets.JsonFile],
//        [".csproj", Assets.ProjectFile],
//        [".sln", Assets.SolutionFile]
//    ]);

//    private formatSize(bytes: number): string {
//        if (bytes < 1024) {
//            return bytes + "bytes";
//        }
//        if (bytes < 1048576) {
//            return Math.round(bytes / 10.24) / 100 + "Kb";
//        }
//        if (bytes < 1073741824) {
//            return Math.round(bytes / 10485.76) / 100 + "Mb";
//        }

//        if (bytes < 1099511627776) {
//            return Math.round(bytes / 10737418.24) / 100 + "Gb";
//        }

//        if (bytes < 1125899906842624) {
//            return Math.round(bytes / 10995116277.76) / 100 + "Tb";
//        }
//    }

//    private async renderDrives(drives: Array<PathObjectLike>, fileViewElement: HTMLTableElement) {
//        drives.map(n => {
//            const tr = document.createElement("tr");
//            tr.addEventListener("click", async () => {
//                const dir = await this.directoryService.GetDrives(n.FullPath);
//                await this.Render(dir);
//            });
//            const td0 = document.createElement("td");
//            const td1 = document.createElement("td");
//            const td2 = document.createElement("td");
//            const td3 = document.createElement("td");
//            const icon = document.createElement("img");

//            icon.src = Assets.Folder;
//            td0.appendChild(icon);

//            td1.innerText = `[${n.Name}]`;
//            td2.innerText = n.Description ?? "";
//            td3.innerText = this.formatSize(n.Size);

//            tr.appendChild(td0);
//            tr.appendChild(td1);
//            tr.appendChild(td2);
//            tr.appendChild(td3);

//            fileViewElement.appendChild(tr);
//        });
//    }

//    private renderFiles(files: PathObjectLike[], FileView: HTMLTableElement) {
//        files.forEach(n => {
//            const tr = document.createElement("tr");
//            const td0 = document.createElement("td");
//            const td1 = document.createElement("td");
//            const td2 = document.createElement("td");
//            const td3 = document.createElement("td");
//            const icon = document.createElement("img");

//            if (!this.fileLookUp.has(n.Extension)) {
//                icon.src = Assets.File;
//            }
//            icon.src = this.fileLookUp.get(n.Extension);

//            td0.appendChild(icon);
//            td1.innerText = n.Name;
//            td2.innerText = "";
//            td3.innerText = this.formatSize(n.Size);

//            tr.appendChild(td0);
//            tr.appendChild(td1);
//            tr.appendChild(td2);
//            tr.appendChild(td3);
//            FileView.appendChild(tr);
//        });
//    }

//    private renderDirectories(directories: PathObjectLike[], FileView: HTMLTableElement) {
//        directories.forEach(n => {
//            const tr = document.createElement("tr");
//            tr.addEventListener("click", async () => {
//                const dir = await this.directoryService.GetDrives(n.FullPath);
//                await this.Render(dir);
//            });
//            const td0 = document.createElement("td");
//            const td1 = document.createElement("td");
//            const icon = document.createElement("img");
//            icon.src = Assets.Folder;
//            td0.appendChild(icon);
//            td1.innerText = `[${n.Name}]`;
//            tr.appendChild(td0);
//            tr.appendChild(td1);
//            FileView.appendChild(tr);
//        });
//    }

//    public async Render(dir: PathObjectLike) {
//        this.fileViewElement.innerHTML = "";

//        if (dir.PathType === PathType.Drive) {
//            this.renderDrives(dir.Drives, this.fileViewElement);
//            this.renderDirectories(dir.Directories, this.fileViewElement);
//            this.renderFiles(dir.Files, this.fileViewElement);
//        }
//        else {
//            //render parent
//            const tr = document.createElement("tr");
//            tr.addEventListener("click", async () => {
//                const parentDir = await this.directoryService.GetDrives(dir.Parent.FullPath);
//                await this.Render(parentDir);
//            });
//            const td0 = document.createElement("td");
//            const td1 = document.createElement("td");
//            const td2 = document.createElement("td");
//            const td3 = document.createElement("td");
//            const icon = document.createElement("img");
//            icon.src = Assets.Folder;
//            td0.appendChild(icon);
//            td1.innerText = `[..]`;
//            td2.innerText = "";
//            td3.innerText = "";
//            tr.appendChild(td0);
//            tr.appendChild(td1);
//            tr.appendChild(td2);
//            tr.appendChild(td3);
//            this.fileViewElement.appendChild(tr);
//            //render parent
//            this.renderDirectories(dir.Directories, this.fileViewElement);
//            this.renderFiles(dir.Files, this.fileViewElement);
//        }

//    }
//}
