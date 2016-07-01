using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using communityapp_aspnetcore_tswebpack.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace communityapp_aspnetcore_tswebpack.Controllers
{
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private static List<Job> _jobs = null;

        public JobsController(IJsonFileReader jsonFileReader) : base(jsonFileReader)
        {
            InitJobData();
        }

        private void InitJobData()
        {
            _jobs = _jobs ?? JsonConvert.DeserializeObject<List<Job>>(_jsonFileReader.Read("jobsData.json"));
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetJobsData()
        {
            return Ok(_jobs);
        }

        [HttpPost]
        [Route("")]
        public IActionResult PostJob([FromBody]Job job)
        {
            if (job.Id != Guid.Empty)
            {
                return BadRequest();
            }
            job.Id = Guid.NewGuid();
            _jobs.Add(job);
            return Ok(job);
        }

        [HttpPut]
        [Route("{jobId}")]
        public IActionResult PutJob(Guid jobId, Job job)
        {
            if (jobId != job.Id) return BadRequest();
            Job match = null;
            _jobs.ForEach(j => { if (j.Id == jobId) match = j; });
            if (match != null) _jobs.Remove(match);
            _jobs.Add(job);
            return Ok();
        }

        [HttpDelete]
        [Route("{jobId}")]
        public IActionResult DeleteJob(Guid jobId)
        {
            Job match = null;
            _jobs.ForEach(j => { if (j.Id == jobId) match = j; });
            if (match != null) _jobs.Remove(match);
            return Ok();
        }

        [HttpGet]
        [Route("JobTypes")]
        public IActionResult GetJobsTypes()
        {
            return Ok(_jsonFileReader.Read("jobTypes.json"));
        }

        [HttpGet]
        [Route("JobSkills")]
        public IActionResult GetJobSkills()
        {
            return Ok(_jsonFileReader.Read("jobSkills.json"));
        }

        [HttpGet]
        [Route("States")]
        public IActionResult GetStates()
        {
            return Ok(_jsonFileReader.Read("states.json"));
        }

    }
}
