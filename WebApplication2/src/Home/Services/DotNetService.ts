import { ProjectDTO } from "../Models/ProjectDTO";
import { Template } from "../Models/Template";

export enum TemplateType {
    project="project",
    file="file"
}

export class DotNetCLIService {

    public async GetVersions(): Promise<Array<string>> {
        const url = location.origin + "/dotnet/versions";
        const response = await fetch(url);
        const text = await response.text();
        return <Array<string>>JSON.parse(text);
    }


    public async GetTemplates(version: string, type: TemplateType): Promise<Array<Template>> {
        if (!version) {
            return [];
        }

        const url = `${location.origin}/dotnet/templates?version=${version}&type=${type}`;
        const response = await fetch(url);
        const text = await response.text();
        return <Array<Template>>JSON.parse(text);
    }

    public async MakeProject(projectName :string, baseDirecotry:string, template: string, language: string = "C#") {
        const dto = new ProjectDTO();
        dto.Template = template;
        dto.BaseDirectory = baseDirecotry;
        dto.Language = language;
        dto.ProjectName = projectName
        await fetch( location.origin+"/dotnet/new",
            {
                method: "POST",
                body: JSON.stringify(dto),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
    }
}
