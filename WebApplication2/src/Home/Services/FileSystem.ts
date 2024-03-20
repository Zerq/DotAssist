import { PathObjectLike } from "../Models/PathObjectLike";
export class FileSystem {
    public constructor() {
    }

    public async GetDirectory(path: string): Promise<PathObjectLike> {
        const url = `${location.origin}/directory/open?dir=${encodeURI(path)}`;
        const response = await fetch(url);
        const text = await response.text();
        return <PathObjectLike>JSON.parse(text);
    }
}
