using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Could replace with app.useSpa and run both api/react on same url & not need cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*");
        });
});

builder.Services.AddSpaStaticFiles(config => config.RootPath = "ClientApp/build");

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//do I need to make client app folder
if (!app.Environment.IsDevelopment())
{
    app.UseSpaStaticFiles();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
    }
    else
    {
        // spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
        // {
        //     FileProvider = new PhysicalFileProvider(
        //         Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/build"))
        // };
    }
});

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
