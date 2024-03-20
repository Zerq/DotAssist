import { PathType } from "./PathType";

export interface PathObjectLike {
    Name: string;
    Description?: string;
    FullPath?: string;
    Extension?: string;
    PathType: PathType;
    Size?: number;
    Parent?: PathObjectLike;
    Directories?: Array<PathObjectLike>;
    Drives?: Array<PathObjectLike>;
    Files?: Array<PathObjectLike>;
}
