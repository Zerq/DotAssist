import { AngularSelected, BaseFolderSelected, DomainEvent, DotNetTemplateSelected, ECMAScriptSelected, PreactSelected, WebpackSelected } from "./DomainEvent";
import { Guid } from "./Guid";


export abstract class DomainCommand {
    public abstract Execute(): Array<DomainEvent>;
}

export class AbortProjectCreation extends DomainCommand {
    public Execute(): DomainEvent[] {
        throw new Error("Method not implemented.");
    }
}

export class SelectBaseFolder extends DomainCommand {
    public Execute(): Array<DomainEvent> {
        const selected = new BaseFolderSelected();
        selected.BaseFolder = this.BaseFolder;
        selected.Created = new Date();
        selected.Id = Guid.NewGuid();
        //selected.SequenceNumber  = ??

        return [selected];
    }

    public BaseFolder: string;
}

export class SelectDotNetTemplate extends DomainCommand {
    public Execute(): DomainEvent[] {
        const selected = new DotNetTemplateSelected();
        selected.TemplateName = this.TemplateName;
        selected.ProjectName = this.ProjectName;
        selected.TemplatLanguage = this.TemplatLanguage;
        selected.Created = new Date();
        selected.Id = Guid.NewGuid();
        //selected.SequenceNumber  = ??
        return [selected];
    }

    public ProjectName: string;
    public ProjectFolder?: string;
    public TemplateName: string;
    public TemplatLanguage?: string;
}

export class SelectScriptingTemplate extends DomainCommand {
    public Execute(): DomainEvent[] {
        switch (this.TemplateName) {
            case "ECMAScript":
                const ecma = new ECMAScriptSelected();
                ecma.Id = Guid.NewGuid();
                ecma.Created = new Date();
                // ecma.SequenceNumber 
                return [ecma];
            case "Webpack":
                const webpack = new WebpackSelected();
                webpack.Id = Guid.NewGuid();
                webpack.Created = new Date();
                // webpack.SequenceNumber
                return [webpack];

            case "Preact":
                const preact = new PreactSelected();
                preact.Id = Guid.NewGuid();
                preact.Created = new Date();
                // preact.SequenceNumber
                return [preact];

            case "Angular":
                const angular = new AngularSelected();
                angular.Id = Guid.NewGuid();
                angular.Created = new Date();
                // angular.SequenceNumber
                return [angular];


        }
    }

    public TemplateName: string;
}

export class SelectExtraStubbs extends DomainCommand {
    public Execute(): DomainEvent[] {
        throw new Error("Method not implemented.");
    }
    public Stubbs: Array<string> = [];
}