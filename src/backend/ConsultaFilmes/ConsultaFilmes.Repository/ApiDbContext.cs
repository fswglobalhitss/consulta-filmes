using ConsultaFilmes.Domain;
using Microsoft.EntityFrameworkCore;

namespace ConsultaFilmes.Repository;

public class ApiDbContext : DbContext
{
    public DbSet<Historico> Historicos { get; set; }

    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
        
    }
}
