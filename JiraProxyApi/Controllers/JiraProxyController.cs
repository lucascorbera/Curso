using Microsoft.AspNetCore.Mvc;

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
}
