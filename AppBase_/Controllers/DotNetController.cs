using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.Security.Cryptography.X509Certificates;

namespace AppBase.Controllers {
    [Route("dotnet")]
    public class DotNetController : Controller {
        private DotNetCli cli = new DotNetCli();
     
        [HttpGet("versions")]
        public List<string> ListVersions() {
            return this.cli.GetVersions().Select(n=> n.Name).ToList();
        }

        [HttpGet("templates")]
        public List<ExpandoObject> GetTemplates(string version, TemplateType type) {
            return this.cli.GetTemplates(version, type);
        }

        [HttpPost("new")]
        public void MakeProject([FromBody] ProjectDTO project) {
            cli.MakeProject(project.ProjectName, project.BaseDirectory, project.Template, project.Language);
        }
    }

    public class ProjectDTO {
        public string ProjectName { get; set; } = "";
        public string Template { get; set; } = "";
        public string Language { get; set; } = "C#";
        public string BaseDirectory { get; set; } ="";
    }


}
