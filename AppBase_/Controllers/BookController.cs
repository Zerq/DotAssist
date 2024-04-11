using Microsoft.AspNetCore.Mvc;
using EpubSharp;
using CsTools.Functional;
using AppBase_.Controllers;
using Microsoft.AspNetCore.Http;
using System.Text;
namespace AppBase.Controllers
{
    public class BookController : Controller
    {

        public BookController() : base()
        {
            this.tts = new Mimic3();
            this.tts.RunServer();
        }

        private Mimic3 tts;

        protected override void Dispose(bool disposing)
        {
            tts.Dispose();
            base.Dispose(disposing);
        }

        public object OpenBook(string path)
        {
            EpubBook book = EpubReader.Read(path);

            var contentTable = book.TableOfContents.Select(n =>
            new
            {
                FileName = n.FileName.Substring(3),
                n.Anchor,
                n.Title,
                SubChapters = n.SubChapters.Select(x => new { x.FileName, x.Anchor, x.Title })
            });

            var styles = book.Resources.Css.Select(n => new
            {
                n.FileName,
                n.MimeType,
                n.TextContent,
                n.ContentType
            });

            var resources = book.Resources.Html.Select(n => new
            {
                n.FileName,
                n.MimeType,
                n.TextContent,
                n.ContentType
            });

            return new { ContentTable = contentTable, Styles = styles, Contents = resources };
        }

        public ActionResult GetContent(string path, string innerPath)
        {
            EpubBook book = EpubReader.Read(path);
            var temp = book.Resources.Html.FirstOrDefault(n => n.FileName == innerPath);
            return Content(temp.TextContent, "text/html", Encoding.UTF8);
        }

        public object ListChapters(string path)
        {
            EpubBook book = EpubReader.Read(path);
            var contentTable = book.TableOfContents.Select(n =>
            new
            {
                FileName = n.FileName.Substring(3),
                n.Anchor,
                n.Title,
                SubChapters = n.SubChapters.Select(x => new { x.FileName, x.Anchor, x.Title })
            });

            return contentTable;
        }
    }
}
