using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace communityapp_aspnetcore_tswebpack.Controllers
{
    public class ControllerBase : Controller
    {
        protected IJsonFileReader _jsonFileReader;
        //private IActionResult GetJsonDataFile(string fileName)
        //{
        //    var path = Path.Combine(_webRoot, fileName);
        //    var json = System.IO.File.ReadAllText(path);

        //    return Ok(json);
        //}
        public ControllerBase(IJsonFileReader jsonFileReader)
        {
            _jsonFileReader = jsonFileReader;
        }
    }
}
