using ConsultaFilmes.Domain.Repository;
using ConsultaFilmes.Domain.Services;
using ConsultaFilmes.Repository;
using ConsultaFilmes.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ConsultaFilmes.Tests;

public static class Helper
{
    public static T GetRequiredService<T>()
    {
        var provider = Provider();
        return provider.GetRequiredService<T>();
    }

    private static IServiceProvider Provider()
    {
        var services = new ServiceCollection();
        services.AddScoped<IFilmeRepository, FilmeRepository>();
        services.AddScoped<IFilmeService, FilmeService>();
        
        services.AddDbContext<ApiDbContext>(opt => opt.UseInMemoryDatabase("Tests"));
        
        return services.BuildServiceProvider();
    }
}
