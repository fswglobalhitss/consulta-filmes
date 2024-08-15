namespace ConsultaFilmes.Domain;

public class Historico
{
    public int Id { get; set; }
    public string NomeFilme { get; set; }
    public string NomePessoa { get; set; }
    public DateTime DataPesquisa { get; set; }

    public static implicit operator HistoricoDto(Historico historico)
    {
        return new HistoricoDto()
        {
            Id = historico.Id,
            Filme = historico.NomeFilme,
            Pesquisador = historico.NomePessoa,
            DataPesquisa = historico.DataPesquisa.ToString("dd/MM/yyyy HH:mm"),
        };
    }
}
