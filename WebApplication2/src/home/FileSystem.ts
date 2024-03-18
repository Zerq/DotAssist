import { PathObjectLike } from "./PathObjectLike";
export class FileSystem {
    public constructor() {
    }

    public async GetDrives(path: string): Promise<PathObjectLike> {
        const url = `${location.origin}/directory/open?dir=${encodeURI(path)}`;
        const response = await fetch(url);
        const text = await response.text();
        return <PathObjectLike>JSON.parse(text);
    }

    public async MoveTempTo(baseFolder: string, projectName: string) {
        const url = `${location.origin}/directory/moveTempTo?baseFolder=${encodeURI(baseFolder)}&projectName=${projectName}`;
        const response = await fetch(url);
        const text = await response.text();
          
        
    }
}
