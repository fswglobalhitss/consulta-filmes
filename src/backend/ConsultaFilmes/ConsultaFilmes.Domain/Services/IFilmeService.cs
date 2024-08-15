namespace ConsultaFilmes.Domain.Services;

public interface IFilmeService
{
    Task<List<Filme>> Consultar(string nomeFilme);
    Task GuardarHistorico(string nomePessoa, string nomeFilme);
    Task<List<HistoricoDto>> ObterHistorico(string? pesquisador, string? filme);
}
