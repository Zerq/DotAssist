import { PathObjectLike } from "./PathObjectLike";
export class FileSystem {
    public constructor() {
    }

    public async GetDrives(path: string): Promise<PathObjectLike> {
        const url = `https://localhost:7217/directory/open/${encodeURI(path)}`;
        const response = await fetch(url);
        const text = await response.text();
        return <PathObjectLike>JSON.parse(text);
    }
}
