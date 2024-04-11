using System.Security.Cryptography.X509Certificates;
using Eto.Forms;
using Eto.Drawing;

namespace Test;

public class App
{
    public static void Main(string[] args)
    {
        new Application().Run(new Form1());
        Console.WriteLine("Hello, World!");
    }

}

public class Form1: Form{
    public Form1(){
        Title = "test";
        ClientSize = new Size(300,200);
        Content = new Label{ Text = "hello world" };        
    }


}


