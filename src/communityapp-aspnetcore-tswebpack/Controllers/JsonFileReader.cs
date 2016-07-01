using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace communityapp_aspnetcore_tswebpack.Controllers
{
    public class JsonFileReader : IJsonFileReader
    {
        private readonly string _webRoot;
        public JsonFileReader(IHostingEnvironment env)
        {
            _webRoot = Path.Combine(env.ContentRootPath, "SampleData");
        }
        public string Read(string fileName)
        {
            var path = Path.Combine(_webRoot, fileName);
            var json = System.IO.File.ReadAllText(path);

            return json;
        }
    }
}
