using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/jira")]
public class JiraProxyController : ControllerBase
{
    private readonly IJiraService _jiraService;

    public JiraProxyController(IJiraService jiraService)
    {
        _jiraService = jiraService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromQuery] string endpoint)
    {
        if (string.IsNullOrWhiteSpace(endpoint))
            return BadRequest(new { error = "Endpoint do Jira não informado" });

        using var sr = new StreamReader(Request.Body);
        var body = await sr.ReadToEndAsync();

        var (statusCode, content) = await _jiraService.PostToJiraAsync(endpoint, body);

        return StatusCode(statusCode, content);
    }

    /// <summary>
    /// Novo endpoint que busca todas as páginas de um endpoint paginado do Jira.
    /// </summary>
/*
    [HttpGet("backlog")]
    public async Task<IActionResult> GetBacklog([FromQuery] string jql)
    {
        try
        {
            var issues = await _jiraService.GetTodosProjetosEmBackLogAsync(jql);
            return Ok(issues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar backlog do Jira", error = ex.Message });
        }
    }
    */
    public class JiraBacklogRequest
    {
        public string Jql { get; set; } = string.Empty;
        public List<string>? Fields { get; set; }
    }


/*
{
  "jql": "project = BDP ORDER BY created DESC",
  "fields": [
    "summary",
    "description",
    "status",
    "issuetype",
    "assignee",
    "reporter",
    "security",
    "created",
    "updated",
    "priority",
    "customfield_10070",
    "customfield_10071",
    "customfield_10043",
    "customfield_10044",
    "customfield_10051",
    "customfield_10049",
    "customfield_10045",
    "customfield_10046",
    "customfield_10075",
    "customfield_10060",
    "customfield_10047",
    "customfield_10039",
    "customfield_10038"
  ]
}
*/

    /// <summary>
    /// Busca todas as issues do backlog no Jira (com paginação automática).
    /// </summary>
    /// <param name="jql">A consulta JQL para filtrar as issues.</param>
    /// <param name="fields">Os campos a serem retornados nas issues.</param>
    /// <returns>Uma lista de issues que correspondem à consulta JQL.</returns>
    /// <remarks>
    /// Este endpoint suporta paginação automática. Ele continuará buscando novas páginas de resultados até que não haja mais resultados.
    /// </remarks>
    [HttpPost("backlogPost")]
    public async Task<IActionResult> PostBacklog([FromBody] JiraBacklogRequest request)
    {
        try
        {
            var fields = request.Fields ?? new List<string>();
            var issues = await _jiraService.GetTodosProjetosEmBackLogAsync(request.Jql, fields);
            return Ok(issues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar backlog do Jira", error = ex.Message });
        }
    }

}
