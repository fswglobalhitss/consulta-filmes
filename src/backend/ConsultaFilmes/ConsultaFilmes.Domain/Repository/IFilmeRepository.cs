namespace ConsultaFilmes.Domain.Repository;

public interface IFilmeRepository
{
    Task<Root> Consultar(string nome);
    Task GuardarHistorico(string nomePessoa, string nomeFilme);
    Task<List<Historico>> ObterHistorico(string? pesquisador, string? filme);
}
