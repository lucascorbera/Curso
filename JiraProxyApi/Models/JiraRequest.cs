namespace JiraProxyApi.Models  // troque "SeuProjeto" pelo namespace real do seu projeto
{
    public class JiraRequest
    {
        public string Jql { get; set; } = string.Empty;
        public IEnumerable<string> Fields { get; set; } = Enumerable.Empty<string>();
    }
}