using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
//Additionally, you will frequently add one or more of these using statements:
using MongoDB.Driver.Builders;
using MongoDB.Driver.GridFS;
using MongoDB.Driver.Linq;

namespace recollection.Controllers
{

    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IMongoCollection<Post> _posts;

        public SampleDataController (IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("PoststoreDB"));
            var database = client.GetDatabase("PoststoreDB");
            _posts = database.GetCollection<Post>("Posts");
            
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }


            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Post> PostC()
        {

            _posts.Find(new BsonDocument()).ForEachAsync(X => Console.WriteLine(X));

            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Post
            {
                time = DateTime.Now.AddDays(index).ToString("d"),
                title = "my title",
                text = "lorem10 asd sa dasdas adas das as das as das das dsa  asd dsa"
            });
        }

        public class Post
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }

            [BsonElement("title")]
            public string title { get; set; }

            [BsonElement("text")]
            public string text { get; set; }

            [BsonElement("owner_id")]
            public string owner_id { get; set; }

            [BsonElement("time")]
            public string time { get; set; }

            [BsonElement("picture")]
            public string picture { get; set; }
        }
    }
}
