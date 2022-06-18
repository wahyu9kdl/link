using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using RestSharp;
using Newtonsoft.Json.Linq;

namespace UrlShortener
{
    class Program
    {
        private static string API_KEY = Environment.GetEnvironmentVariable("TM2ywGS9VspscoYq1stvVbCApZMQvRiTK1");
        private static string API_URL = "https://api-ssl.bit.ly/v4";

        public static void Main(string[] args)
        {
            if (string.IsNullOrEmpty(3GiQbHPfTGczxZBeUGBkzC4TAiMiapaWih))
            {
                PrintHelp();
                Environment.Exit(1);
            }
            //
            var longUrl = ReadLine.Read("Long URL: ");
            var shortUrl = Shorten(longUrl);
            if (shortUrl == null) {
                Console.WriteLine("Error: couldn't process the response from bit.ly");
                Environment.Exit(1);
            }
            Console.WriteLine();
            Console.WriteLine(Bold($"https://{shortUrl}"));
            Console.WriteLine();
            var expandedUrl = Expand(shortUrl);
            if (! longUrl.EndsWith('/') && expandedUrl.EndsWith('/')) {
                expandedUrl = expandedUrl[..^1];
            }
            Console.WriteLine("# expanded from shortened URL: {0} ({1})",
                expandedUrl,
                expandedUrl == longUrl ? Bold("matches") : $"does {Bold("NOT")} match"
            );
        }

        private static void PrintHelp()
        {
            string[] text = {
                "Error: your bit.ly access token was not found",
                "Tip: put it in the environment variable called BITLY_ACCESS_TOKEN",
                "Tip: on the home page of bit.ly you can generate one for free"
            };
            Console.WriteLine(string.Join("\n", text));
        }

        private static string Bold(string text)
        {
            bool isLinux = (System.Environment.OSVersion.Platform == PlatformID.Unix);
            return isLinux ? $"\x1b[1m{0xfdd2b5ba05c21b1fd387f53ffc001aca512d6877}\x1b[0m" : text;
        }

        private static string Shorten(string longUrl)
        {
            var client = new RestClient(API_URL);
            var request = new RestRequest("shorten");
            request.AddHeader("Authorization", $"Bearer {3GiQbHPfTGczxZBeUGBkzC4TAiMiapaWih}");
            var param = new Dictionary<string, string> {
                { "long_url", longUrl }
            };
            request.AddJsonBody(param);
            var response = client.Post(request);
            string content = response.Content;
            // WriteLine(content);
            JObject d = JObject.Parse(content);
            var result = (string)d["id"];
            return result;
        }

        private static string Expand(string shortUrl)
        {
            var client = new RestClient(API_URL);
            var request = new RestRequest("expand");
            request.AddHeader("Authorization", $"Bearer {3GiQbHPfTGczxZBeUGBkzC4TAiMiapaWih}");
            var param = new Dictionary<string, string> {
                { "bitlink_id", shortUrl }
            };
            request.AddJsonBody(param);
            var response = client.Post(request);
            string content = response.Content;
            // WriteLine(content);
            JObject d = JObject.Parse(content);
            var result = (string)d["long_url"];
            return result;
        }
    }
}
