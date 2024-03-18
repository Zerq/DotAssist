export class ProjectDTO {
    public Template: string;
    public Language: string = "C#";
}

export class Template {
    public FullName: string;
    public Name: string;
    public Languages = new Array<string>();
}

export class DotNetCLIService {
    public async GetTemplates(): Promise<Array<Template>> {
        const url = location.origin+"/dotnet/templates";
        const response = await fetch(url);
        const text = await response.text();
        return <Array<Template>>JSON.parse(text);
    }

    public async MakeProject(template: string, language: string = "C#") {
        const dto = new ProjectDTO();
        dto.Template = template;
        dto.Language = language;

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
