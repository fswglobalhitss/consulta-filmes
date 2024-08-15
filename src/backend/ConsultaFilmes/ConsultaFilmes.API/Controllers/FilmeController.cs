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
    public async Task<IActionResult> Get(string nomePessoa, string nomeFilme)
    {
        var result = await FilmeService.Consultar(nomeFilme);

        await FilmeService.GuardarHistorico(nomePessoa, nomeFilme);

        if (!result.Any())
            return NotFound();

        return Ok(result);
    }

    [HttpGet("Historico")]
    [EnableCors]
    public async Task<IActionResult> GetHistorico(string? pesquisador, string? filme)
    {
        var result = await FilmeService.ObterHistorico(pesquisador, filme);

        if (!result.Any())
            return NotFound();

        return Ok(result);

    }
}
