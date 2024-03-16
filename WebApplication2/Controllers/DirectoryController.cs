using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace WebApplication2.Controllers {
    [Route("directory")]
    public class DirectoryController : Controller {
        [HttpGet("open/{dir}")]
        public PathItem Open(string dir) {
            if (Directory.Exists(dir)) {
                var direcotry = new DirectoryInfo(dir);

                var result = new PathItem();
                if (direcotry.Parent == null) {
                    result.PathType = PathType.Drive;
                    result.Drives = DriveInfo.GetDrives().Select(n => new PathItem() {
                        PathType = PathType.Drive,
                        Name = n.Name,
                        Description = n.VolumeLabel,
                        FullPath = n.Name,
                        Size = n.TotalSize
                    }).ToList();
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
            throw new ApplicationException("directory not found");
        }
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
}