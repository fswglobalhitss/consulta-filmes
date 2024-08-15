using ConsultaFilmes.Domain;
using ConsultaFilmes.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace ConsultaFilmes.Repository;

public class FilmeRepository : IFilmeRepository
{
    public ApiDbContext ApiDbContext;

    public FilmeRepository(ApiDbContext apiDbContext)
    {
        ApiDbContext = apiDbContext;
    }

    public async Task<Root> Consultar(string nome)
    {
        HttpClient client = new();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", ""); //informar o token de acesso da api pública

        string url = "https://the-one-api.dev/v2/movie";
        if (!string.IsNullOrEmpty(nome))
            url += $"?name=/{nome}/i";

        return await client.GetFromJsonAsync<Root>(url);
    }

    public async Task GuardarHistorico(string nomePessoa, string nomeFilme)
    {
        await ApiDbContext.Historicos.AddAsync(new Historico()
        {
            NomeFilme = nomeFilme,
            NomePessoa = nomePessoa,
            DataPesquisa = DateTime.Now
        });

        await ApiDbContext.SaveChangesAsync();
    }

    public async Task<List<Historico>> ObterHistorico(string? pesquisador, string? filme) 
    {
        return await ApiDbContext.Historicos
                                 .Where(x => (pesquisador != null ? x.NomePessoa.Contains(pesquisador) : x.NomePessoa == x.NomePessoa)
                                          && (filme != null ? x.NomeFilme.Contains(filme) : x.NomeFilme == x.NomeFilme))
                                 .ToListAsync();

    }
    
}
