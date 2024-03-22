using Gtk;

internal class Program {
    private static void Main(string[] args) {
        static void Main(string[] args) {
            // var window = new WebWindow("My super app");
            //  window.NavigateToString("<h1>Hello, world!</h1> This window is from a .NET Core app.");
            //  window.WaitForExit();
            //Application.Init();
            
            //var app = new Application("Burklax", GLib.ApplicationFlags.None);
            //app.Register(GLib.Cancellable.Current);
            //var win = new Window("Lo");
           var x = WebWindowNetCore.WebView.Create();
            x.Url( "https://www.google.com");
            x.Build();

          // app.AddWindow(win);
          //  win.Show();
          //  Application.Run();

      

        }
    }
}