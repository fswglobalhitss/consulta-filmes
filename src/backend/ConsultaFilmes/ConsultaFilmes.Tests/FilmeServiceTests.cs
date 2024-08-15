using ConsultaFilmes.Domain.Services;

namespace ConsultaFilmes.Tests;

public class FilmeServiceTests
{
    private readonly IFilmeService _filmeService;

    public FilmeServiceTests() => _filmeService = Helper.GetRequiredService<IFilmeService>();
    

    [Fact]
    public async Task DeveRecuperarFilmeExistente()
    {
        string nomeFilme = "The";
     
        var filmes = await _filmeService.Consultar(nomeFilme);

        Assert.True(filmes.Any());
    }

    [Fact]
    public async Task DeveProcurarFilmeInexistente()
    {
        string nomeFilme = "Teste";
        var filmes = await _filmeService.Consultar(nomeFilme);

        Assert.False(filmes.Any());
    }

    [Fact]
    public async Task DeveGerarHistorico()
    {
        await _filmeService.GuardarHistorico("Teste", "Filme Teste 1");

        var result = await _filmeService.ObterHistorico();

        Assert.True(result.Any());
    }
}
