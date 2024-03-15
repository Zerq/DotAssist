import { Guid } from "./Guid";

export abstract class DomainEvent {
    public id: Guid;
    public abstract EventName: string;
    public Created: Date;
    public SequenceNumber: number;
}

export class BaseFolderSelected extends DomainEvent {
    public EventName = BaseFolderSelected.name;
    public BaseFolder: string;
}

export class DotNetTemplateSelected extends DomainEvent {
    public EventName = DotNetTemplateSelected.name;
    public ProjectName: string;
    public ProjectFolder?: string;
    public TemplateName: string;
    public TemplatLanguage?: string;
}

export class PreactSelected extends DomainEvent {
    public EventName = PreactSelected.name;
}

export class AngularSelected extends DomainEvent {
    public EventName = AngularSelected.name;
}

export class ECMAScriptSelected extends DomainEvent {
    public EventName = ECMAScriptSelected.name;
}

export class WebpackSelected extends DomainEvent {
    public EventName = WebpackSelected.name;
}