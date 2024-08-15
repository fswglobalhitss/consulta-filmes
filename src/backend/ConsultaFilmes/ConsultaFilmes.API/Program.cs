using ConsultaFilmes.API;
using ConsultaFilmes.Domain.Repository;
using ConsultaFilmes.Domain.Services;
using ConsultaFilmes.Repository;
using ConsultaFilmes.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt => opt.SwaggerDoc("v1", new OpenApiInfo 
{
    Title = "Consulta de Filmes",
    Description = "API REST .NET 8 com EntityFramework e bando de dados relacional PostgreSql",
    Version = "v1",
    Contact = new OpenApiContact
    {
        Name = "GlobalHitss",
        Email = "claudio.lopes@globalhitss.com.br",
        Url = new Uri("https://globalhitss.com/br/")
    }
}));

builder.Services.AddScoped<IFilmeService, FilmeService>();
builder.Services.AddScoped<IFilmeRepository, FilmeRepository>();

var conn = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApiDbContext>(opt => 
{
    opt.UseNpgsql(conn, x => x.MigrationsAssembly("ConsultaFilmes.API"));
});

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "AllowOrigin",
    policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseExceptionHandler();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
    db.Database.Migrate();
}

app.Run();
