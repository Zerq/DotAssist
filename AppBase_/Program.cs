using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AppBase.Hubs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder();
builder.WebHost.UseUrls(new string[]{"http://localhost:1053"});
builder.Services.AddCors();
builder.Services.AddSignalR()
    .AddJsonProtocol(options => {
        options.PayloadSerializerOptions.PropertyNamingPolicy = new LowerCaseNamingPolicy();
    });
builder.Services.AddControllers().AddJsonOptions(o => {
    o.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
    o.JsonSerializerOptions.WriteIndented = true;
});


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
app.MapHub<EventHub>("/events");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.MapControllers();
app.MapGet("/test", () => "test123");
app.UseDefaultFiles();
app.MapDefaultControllerRoute();
app.UseStaticFiles();

app.Start();

             WebWindowNetCore.WebView.Create()
               .InitialBounds(600, 800)
               .Title("WebView Test")
               .ResourceIcon("icon")
               .DebuggingEnabled()
               .DefaultContextMenuEnabled()
               .SaveBounds()
               .OnClosing(() => { 
                    return true;
                    })        
               .Url("http://localhost:1053/index.html")
               .Build()
               .Run();

