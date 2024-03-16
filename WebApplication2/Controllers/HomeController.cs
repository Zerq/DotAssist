using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Text.Json.Serialization;

namespace WebApplication2.Controllers {
    public class HomeController : Controller {

        public ActionResult Index() {
            return new RedirectResult("./index.html");
        }
    }
}
