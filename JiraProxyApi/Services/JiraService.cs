using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
public class JiraService : IJiraService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly JiraOptions _options;

    public JiraService(IHttpClientFactory httpClientFactory, IOptions<JiraOptions> options)
    {
        _httpClientFactory = httpClientFactory;
        _options = options.Value;
    }

    public async Task<(int StatusCode, string Content)> PostToJiraAsync(string endpoint, string body)
    {
        var client = _httpClientFactory.CreateClient("jira");

        // Basic auth com email:token (token vindo de configuração/secret)
        var auth = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_options.Email}:{_options.ApiToken}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);

        // 🔧 Corrige possíveis barras faltando na URL
        var baseUrl = _options.BaseUrl.TrimEnd('/') + "/";
        var endpointFixed = endpoint.TrimStart('/');
        var url = new Uri(new Uri(baseUrl), endpointFixed);

        var request = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(body ?? "", Encoding.UTF8, "application/json")
        };

        using var response = await client.SendAsync(request);

        Console.WriteLine($"===> URL: {url}");
        Console.WriteLine($"===> Auth: {auth.Substring(0, 6)}... (ocultado)");
        Console.WriteLine($"===> Status: {response.StatusCode}");

        var responseBody = await response.Content.ReadAsStringAsync();
        return ((int)response.StatusCode, responseBody);
    }

    public async Task<List<JsonElement>> GetTodosProjetosEmBackLogAsync(string jqlConsulta)
    {
        const int maxResults = 50;
        var todasIssues = new List<JsonElement>();
        string? nextPageToken = null;

        do
        {
            var body = new
            {
                jql = jqlConsulta,
                fields = new[] { "status", "customfield_10042", "assignee", "reporter", "issuetype", "summary" },
                maxResults,
                nextPageToken
            };

            var jsonBody = JsonSerializer.Serialize(body);

            // Chamada ao método existente que faz o POST
            var (statusCode, content) = await PostToJiraAsync("search/jql", jsonBody);

            if (statusCode != 200)
            {
                Console.WriteLine($"Erro ao consultar o Jira (Status {statusCode}): {content}");
                break;
            }

            using var document = JsonDocument.Parse(content);
            var root = document.RootElement;

            // Coleta todas as issues retornadas
            if (root.TryGetProperty("issues", out var issuesElement) && issuesElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var issue in issuesElement.EnumerateArray())
                {
                    string issueJson = issue.GetRawText();
                    var issueClone = JsonDocument.Parse(issueJson).RootElement.Clone();
                    todasIssues.Add(issueClone);
                }
            }

            // Verifica se há próxima página
            if (root.TryGetProperty("nextPageToken", out var tokenElement) &&
                tokenElement.ValueKind == JsonValueKind.String)
            {
                nextPageToken = tokenElement.GetString();
            }
            else
            {
                nextPageToken = null;
            }

        } while (!string.IsNullOrEmpty(nextPageToken));

        return todasIssues;
    }
}
