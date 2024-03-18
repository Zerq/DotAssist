using Microsoft.AspNetCore.Mvc;

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
            cli.MakeProject(project.Template, project.Language);
        }
    }

    public class ProjectDTO {
        public string Template { get; set; }
        public string Language { get; set; } = "C#";
    }


}
