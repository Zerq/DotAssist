import { Guid } from "../Home/Models/Guid";

export abstract class DomainEvent {
    public Id: Guid;
    public abstract EventName: string;
    public Created: Date;
    public SequenceNumber: number;
}

export class BaseFolderSelected extends DomainEvent {
    public constructor() { super(); }
    public EventName = BaseFolderSelected.name;
    public BaseFolder: string;
}

export class DotNetTemplateSelected extends DomainEvent {
 
    public constructor() { super(); }
    public EventName = DotNetTemplateSelected.name;
    public ProjectName: string;
    public BaseDirectory: string;
    public TemplateName: string;
    public TemplatLanguage?: string;
}

export class PreactSelected extends DomainEvent {
    public constructor() { super(); }
    public EventName = PreactSelected.name;
}

export class AngularSelected extends DomainEvent {
    public constructor() { super(); }
    public EventName = AngularSelected.name;
}

export class ECMAScriptSelected extends DomainEvent {
    public EventName = ECMAScriptSelected.name;
}

export class WebpackSelected extends DomainEvent {
    public constructor() { super(); }
    public EventName = WebpackSelected.name;
}

export class ProjectSetupAborted extends DomainEvent {
    public constructor() { super(); }
    public EventName = ProjectSetupAborted.name;
}

export class ProjectCreationCompleted extends DomainEvent {
    public constructor() { super(); }
    public EventName = ProjectCreationCompleted.name;
}