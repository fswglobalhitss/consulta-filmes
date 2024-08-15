using ConsultaFilmes.Domain;
using ConsultaFilmes.Domain.Repository;
using ConsultaFilmes.Domain.Services;

namespace ConsultaFilmes.Service;

public class FilmeService : IFilmeService
{
    public IFilmeRepository FilmeRepository { get; set; }
    public FilmeService(IFilmeRepository filmeRepository) => FilmeRepository = filmeRepository;

    public async Task<List<Filme>> Consultar(string nomeFilme) 
    {
        var root = await FilmeRepository.Consultar(nomeFilme);

        return root.ConverterParaFilme().ToList();
    }
    public async Task GuardarHistorico(string nomePessoa, string nomeFilme) => await FilmeRepository.GuardarHistorico(nomePessoa, nomeFilme);

    public async Task<List<HistoricoDto>> ObterHistorico(string? pesquisador, string? filme) 
    {
        var result = await FilmeRepository.ObterHistorico(pesquisador, filme);
        return result.Select(x => (HistoricoDto)x).ToList();
    }

}
