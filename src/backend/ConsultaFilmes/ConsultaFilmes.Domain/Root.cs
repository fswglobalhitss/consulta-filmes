namespace ConsultaFilmes.Domain;

public class Root
{
    public List<Doc> docs { get; set; }

    public IEnumerable<Filme> ConverterParaFilme()
    {
        foreach (var item in docs)
        {
            yield return item;
        }
    }
}

public class Doc
{
    public string name { get; set; }

    public static implicit operator Filme(Doc doc)
    {
        return new()
        {
            Nome = doc.name,
        };
    }
}
