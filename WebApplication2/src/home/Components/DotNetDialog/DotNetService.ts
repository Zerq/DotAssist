export class ProjectDTO {
    public ProjectName: string;
    public BaseDirectory: string;
    public Template: string;
    public Language: string = "C#";
}

export class Template {
    public FullName: string;
    public Name: string;
    public Tags = new Array<string>();
    public Languages = new Array<string>();
}

export class DotNetCLIService {
    public async GetTemplates(): Promise<Array<Template>> {
        const url = location.origin+"/dotnet/templates";
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
