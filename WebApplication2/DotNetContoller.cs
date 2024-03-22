using Microsoft.AspNetCore.Http.Features;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Dynamic;
using System.IO.Compression;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace WebApplication2 {

    [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TemplateType {
        project,
        file
    }

    public class NugetPackage {
        public string author { get; set; }
        public List<string> classifications { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string shortName { get; set; }
        public List<string> tags { get; set; }

    }

    public class DotNetCli {
        public List<DirectoryInfo> GetVersions() {
            string dotNetLocation = "C:\\Program Files\\dotnet\\templates";

            return new DirectoryInfo(dotNetLocation).GetDirectories().ToList();
        }

        // List<Template>
        public List<ExpandoObject> GetTemplates(string version, TemplateType type) {
            List<ExpandoObject> result = new List<ExpandoObject>();
            foreach (var file in this.GetVersions().FirstOrDefault(n => n.Name == version).GetFiles()) {
                using (var archive = ZipFile.OpenRead(file.FullName)) {

                    foreach (var templateEntry in archive.Entries.Where(n => n.Name == "template.json")) {
                        using (Stream stream = templateEntry.Open()) {
                            using (TextReader reader = new StreamReader(stream)) {
                                var text = reader.ReadToEnd();
                                dynamic item = JsonConvert.DeserializeObject<ExpandoObject>(text);

                                if (item == null) {
                                    continue;
                                }

                                if (type == TemplateType.project &&
                                   ((IDictionary<String, object>)item).ContainsKey("tags") &&
                                   item.tags.type == "project") {
                                    result.Add(item);
                                }

                                if (type == TemplateType.file && item != null) {
                                    result.Add(item);
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        public List<Template> GetTemplatesOld() {

            List<Template> result = new List<Template>();
            using (var proc = new Process {
                StartInfo = new ProcessStartInfo {
                    FileName = "dotnet",
                    Arguments = "new list",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            }) {
                proc.Start();
                while (!proc.StandardOutput.EndOfStream) {
                    var tempString = proc.StandardOutput.ReadToEnd().Split(@"
An example would be:
   dotnet new console")[0];

                    var intex = tempString.IndexOf("-");
                    tempString = tempString.Substring(intex);

                    Regex sizer = new Regex("(-.*?)[\\s|\\n]");
                    var matches = sizer.Matches(tempString);
                    var longNameSize = new Point(matches[0].Index, matches[0].Value.Length);
                    var shortNameSize = new Point(matches[1].Index, matches[1].Value.Length);
                    var LanguageSize = new Point(matches[2].Index, matches[2].Value.Length);
                    var tagSize = new Point(matches[3].Index, matches[3].Value.Length);


                    var lastThingy = @"-
";
                    var lastIndex = tempString.LastIndexOf(lastThingy);

                    tempString = tempString.Substring(lastIndex + lastThingy.Length);
                    var rows = tempString.Split(@"
").Where(n => n != string.Empty);

                    result = rows.Select(n => {
                        var template = new Template();

                        template.Tags = n.Substring(tagSize.X, tagSize.Y - 1).Trim().Split("/").ToList();

                        template.FullName = n.Substring(longNameSize.X, longNameSize.Y);

                        var temp = n.Substring(shortNameSize.X, shortNameSize.Y);

                        if (temp.IndexOf(",") != -1) {
                            template.Name = temp.Split(",")[0];
                        }
                        else {
                            template.Name = temp;
                        }

                        template.Languages = n.Substring(LanguageSize.X, LanguageSize.Y).Trim().Replace("[", "").Replace("]", "").Split(",").ToList();

                        return template;
                    }).ToList();

                }
            }
            return result;
        }
        public void MakeProject(string projectName, string baseDirectory, string template, string language = "C#", bool dryrun = false) {
            var root = Path.Combine(baseDirectory, projectName);
            using (Process p = new Process()) {
                ProcessStartInfo info = new ProcessStartInfo();
                info.RedirectStandardInput = true;
                info.UseShellExecute = false;
                info.FileName = "dotnet";

                var dryRunString = "";
                if (dryrun) { dryRunString = "--dry-run"; }

                info.Arguments = $"new {template} -o {root} {dryRunString}";
                info.WorkingDirectory = root;
                p.StartInfo = info;
                p.Start();
                p.OutputDataReceived += datarecived;
            }
        }
        private void datarecived(object sender, DataReceivedEventArgs e) {
            Console.Write(e.Data);
        }
    }


    public class Template {
        public string FullName { get; set; } = "";
        public string Name { get; set; } = "";
        public List<string> Tags { get; set; } = new List<string>();
        public List<string> Languages { get; set; } = new List<string>();
    }
}