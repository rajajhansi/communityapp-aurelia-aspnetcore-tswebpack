using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace communityapp_aspnetcore_tswebpack.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        public EventsController(IJsonFileReader jsonFileReader) : base(jsonFileReader)
        {
        }

        // GET: api/values
        [HttpGet]
        [Route("")]
        public IActionResult GetEventsData()
        {
            return Ok(_jsonFileReader.Read("eventsData.json"));
        }
    }
}
