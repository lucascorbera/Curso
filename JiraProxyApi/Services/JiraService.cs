using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;

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
}
