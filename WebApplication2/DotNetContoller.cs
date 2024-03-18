using System.Diagnostics;
using System.Drawing;
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
                    Arguments = "new",
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
                    var Languagesize = new Point(matches[2].Index, matches[2].Value.Length);

                    var lastThingy = @"-
";
                    var lastIndex = tempString.LastIndexOf(lastThingy);

                    tempString = tempString.Substring(lastIndex + lastThingy.Length);
                    var rows = tempString.Split(@"
").Where(n => n != string.Empty);

                    result = rows.Select(n =>
                    {
                        var template = new Template();

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

                        template.Languages = n.Substring(Languagesize.X, Languagesize.Y).Replace("[", "").Replace("]", "").Split(",").ToList();

                        return template;
                    }).ToList();

                }
            }
            return result;
        }
        public void MakeProject(string rootFolder, string projectName, string template, string language = "C#")
        {
            if (!Directory.Exists(rootFolder))
            {
                throw new ApplicationException("Folder does not exist");
            }

            var newDir = new DirectoryInfo(rootFolder).CreateSubdirectory(projectName);

            if (!newDir.Exists)
            {
                throw new ApplicationException("faild to create projectFolder");
            }

            using (Process p = new Process())
            {
                ProcessStartInfo info = new ProcessStartInfo();
                info.FileName = "cmd.exe";
                info.RedirectStandardInput = true;
                info.UseShellExecute = false;

                p.StartInfo = info;
                p.Start();

                using (StreamWriter sw = p.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine("cd " + newDir.FullName);
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
        public List<string> Languages { get; set; } = new List<string>();
    }
}