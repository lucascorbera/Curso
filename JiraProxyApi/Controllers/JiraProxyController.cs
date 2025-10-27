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
}
