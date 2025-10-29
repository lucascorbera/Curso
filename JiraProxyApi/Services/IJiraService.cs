using System.Text.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IJiraService
{
    Task<(int StatusCode, string Content)> PostToJiraAsync(string endpoint, string body);
    Task<JiraIssuesResult> GetTodosProjetosEmBackLogAsync(string jqlConsulta, IEnumerable<string> fields);
}
