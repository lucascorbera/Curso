using System.Text.Json; 
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IJiraService
{
    Task<(int StatusCode, string Content)> PostToJiraAsync(string endpoint, string body);
    Task<List<JsonElement>> GetTodosProjetosEmBackLogAsync(string jqlConsulta);
}
