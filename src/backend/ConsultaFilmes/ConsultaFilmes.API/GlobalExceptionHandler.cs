using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace ConsultaFilmes.API;

public class GlobalExceptionHandler : IExceptionHandler
{
    public ILogger<GlobalExceptionHandler> Logger { get; set; }
    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) => Logger = logger;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        Logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

        var dataAtual = DateTime.Now;
        string path = $"./logs/{dataAtual.Year}{dataAtual.Month}{dataAtual.Day}{dataAtual.Hour}{dataAtual.Minute}{dataAtual.Second}.txt";
        using var sw = new StreamWriter(path, true);
        sw.WriteLine(exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "Server error"
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;

        await httpContext.Response
            .WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
