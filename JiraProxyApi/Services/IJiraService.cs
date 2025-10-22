using System.Net.Http;
using System.Threading.Tasks;

public interface IJiraService
{
    Task<(int StatusCode, string Content)> PostToJiraAsync(string endpoint, string body);
}
