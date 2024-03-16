using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace WebApplication2.Controllers {
    [Route("dotnet")]
    public class DotNetController : Controller {
        private DotNetCli cli = new DotNetCli();
     
        [HttpGet("templates")]
        public List<Template> GetTemplates() {
            return this.cli.GetTemplates();
        }

        [HttpPost("/new")]
        public void MakeProject([FromBody] ProjectDTO project) {
            cli.MakeProject(project.RootFolder, project.ProjectName, project.Template, project.Language);
        }
    }

    public class ProjectDTO {
        public string RootFolder { get; set; }
        public string ProjectName { get; set; }
        public Template Template { get; set; }
        public string Language { get; set; } = "C#";
    }


    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PathType {
        Drive,
        Directory,
        File
    }

}
