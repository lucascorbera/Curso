using System.Text.Json;

public class JiraIssuesResult
{
        public int TotalCount { get; set; }
        public List<JsonElement> Issues { get; set; } = new();
}
