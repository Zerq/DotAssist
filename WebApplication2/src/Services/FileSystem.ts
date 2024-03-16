import { PathObjectLike } from "../Home/PathObjectLike.js";
export class FileSystem {
    public constructor() {
    }

    public async GetDrives(path: string): Promise<PathObjectLike> {
        const url = `${location.origin}/directory/open/${encodeURI(path)}`;
        const response = await fetch(url);
        const text = await response.text();
        return <PathObjectLike>JSON.parse(text);
    }
}
