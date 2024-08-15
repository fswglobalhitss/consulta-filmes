using ConsultaFilmes.Domain;
using ConsultaFilmes.Domain.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultaFilmes.API.Controllers;

[ApiController]
[Route("[controller]")]
public class FilmeController : ControllerBase
{
    public IFilmeService FilmeService { get; set; }

    public FilmeController(IFilmeService filmeService) => FilmeService = filmeService;

    [HttpGet]
    [EnableCors]
    public async Task<List<Filme>> Get(string nomePessoa, string nomeFilme) 
    {
        var result = await FilmeService.Consultar(nomeFilme);

        await FilmeService.GuardarHistorico(nomePessoa, nomeFilme);

        return result;
    }

    [HttpGet("Historico")]
    [EnableCors]
    public async Task<List<HistoricoDto>> GetHistorico(string? pesquisador, string? filme) => await FilmeService.ObterHistorico(pesquisador, filme);
}
