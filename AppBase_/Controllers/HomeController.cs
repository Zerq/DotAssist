using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Text.Json.Serialization;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Security.Permissions;
using AppBase_.Controllers;
using CsTools.Extensions;
using CsTools.Functional;
namespace AppBase.Controllers
{

    public class HomeController : Controller {

        public ActionResult Index() {
            return new RedirectResult("/home.html");
        }
 

    }

    [Route("directory")]
    public class DirectoryController : Controller {

        [HttpGet("open")]
        public PathItem? Open(string dir) {
            try {
                if (dir == "root") {
                 string homePath = (Environment.OSVersion.Platform == PlatformID.Unix ||
                   Environment.OSVersion.Platform == PlatformID.MacOSX)
    ? Environment.GetEnvironmentVariable("HOME")
    : Environment.ExpandEnvironmentVariables("%HOMEDRIVE%%HOMEPATH%");

                    dir = homePath;
                    //dir = AppDomain.CurrentDomain.BaseDirectory;
                }

                if (Directory.Exists(dir)) {
                    var direcotry = new DirectoryInfo(dir);

                    var result = new PathItem();
                    if (direcotry.Parent == null) {
                        result.PathType = PathType.Drive;
                        /* result.Drives = DriveInfo.GetDrives().Select(n => new PathItem() {
                             PathType = PathType.Drive,
                             Name = n.Name,
                             Description = n.VolumeLabel,
                             FullPath = n.Name,
                             Size = n.TotalSize
                         }).ToList();*/
                        result.Directories = direcotry.GetDirectories().Select(n => {
                            return new PathItem() {
                                Name = n.Name,
                                FullPath = n.FullName
                            };
                        }).ToList();
                        result.Files = direcotry.GetFiles().Select(n => new PathItem() {
                            Name = n.Name,
                            FullPath = n.FullName,
                            Size = n.Length,
                            Extension = n.Extension,
                        }).ToList();
                        result.Name = direcotry.Name;
                        result.FullPath = direcotry.FullName;
                    }
                    else {
                        result.PathType = PathType.Directory;
                        result.Directories = direcotry.GetDirectories().Select(n => new PathItem() {
                            Name = n.Name,
                            FullPath = n.FullName
                        }).ToList();
                        result.Files = direcotry.GetFiles().Select(n => new PathItem() {
                            Name = n.Name,
                            FullPath = n.FullName,
                            Size = n.Length,
                            Extension = n.Extension,
                        }).ToList();
                        result.Name = direcotry.Name;
                        result.FullPath = direcotry.FullName;
                        result.Parent = new PathItem() {
                            Name = direcotry.Parent.Name,
                            FullPath = direcotry.Parent.FullName
                        };
                    }
                    return result;
                }
                return null;
            }
            catch (ApplicationException ex) {
                return null;
            }
        }

        [HttpGet("movetempto")]
        public void moveTempTo(string baseFolder, string projectName) {
            if (baseFolder == "root") {
                baseFolder = AppDomain.CurrentDomain.BaseDirectory;
            }

            var folder = new FileInfo(Path.Combine(baseFolder, projectName));
            if (!folder.Exists) {
                folder.Create();
            }

            var temp = new DirectoryInfo(Path.Combine(
          AppDomain.CurrentDomain.BaseDirectory,
          "tempProj"));

            temp.MoveTo(folder.FullName);
        }
    }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PathType {
    Drive,
    Directory,
    File
}

public class PathItem {
    public string Name { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FullPath { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Extension { get; set; }
    public PathType PathType { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public long? Size { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public PathItem? Parent { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<PathItem>? Directories { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<PathItem>? Drives { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<PathItem>? Files { get; set; }
}