using Microsoft.Extensions.Options;
using System.Net.Http.Headers;


var builder = WebApplication.CreateBuilder(args);

// config pattern object
builder.Services.Configure<JiraOptions>(builder.Configuration.GetSection("Jira"));

// Cors - permite seu Angular local
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// HttpClientFactory para chamadas ao Jira
builder.Services.AddHttpClient("jira", (sp, client) =>
{
    var jiraOpt = sp.GetRequiredService<IOptions<JiraOptions>>().Value;
    client.BaseAddress = new Uri(jiraOpt.BaseUrl);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    // A autenticação Basic será definida no serviço para garantir que use o token atual.
});

// registrar service
builder.Services.AddScoped<IJiraService, JiraService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowAngularDev");

app.UseAuthorization();

app.MapControllers();

app.Run();