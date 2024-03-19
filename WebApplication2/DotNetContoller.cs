using System.Diagnostics;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace WebApplication2
{
    public class DotNetCli
    {
        public List<Template> GetTemplates()
        {
            List<Template> result = new List<Template>();
            using (var proc = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "dotnet",
                    Arguments = "new list",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            })
            {
                proc.Start();
                while (!proc.StandardOutput.EndOfStream)
                {
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

                    result = rows.Select(n =>
                    {
                        var template = new Template();

                        template.Tags = n.Substring(tagSize.X, tagSize.Y - 1).Split("/").ToList();

                        template.FullName = n.Substring(longNameSize.X, longNameSize.Y);

                        var temp = n.Substring(shortNameSize.X, shortNameSize.Y);

                        if (temp.IndexOf(",") != -1)
                        {
                            template.Name = temp.Split(",")[0];
                        }
                        else
                        {
                            template.Name = temp;
                        }

                        template.Languages = n.Substring(LanguageSize.X, LanguageSize.Y).Replace("[", "").Replace("]", "").Split(",").ToList();

                        return template;
                    }).ToList();

                }
            }
            return result;
        }
        public void MakeProject(string projectName, string baseDirectory, string template, string language = "C#")
        {
            var root = new DirectoryInfo(Path.Combine( baseDirectory, projectName));

            if (!root.Exists) {
                root.Create();
            }

            using (Process p = new Process())
            {
                ProcessStartInfo info = new ProcessStartInfo();
 
                var shellName = "/bin/bash";
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) {
                    shellName = "cmd";
                }

                info.RedirectStandardInput = true;
                info.UseShellExecute = false;
                info.FileName = shellName;
                p.StartInfo = info;
                p.Start();

                using (StreamWriter sw = p.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine("cd " + root.FullName);
                        sw.WriteLine("dotnet new " + template);
                    }
                }
            }
        }
    }


    public class Template
    {
        public string FullName { get; set; }
        public string Name { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public List<string> Languages { get; set; } = new List<string>();
    }
}