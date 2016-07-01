using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communityapp_aspnetcore_tswebpack.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime NeedDate { get; set; }
        public string[] JobSkills { get; set; }
        public string JobType { get; set; }
        public string Description { get; set; }
        public Location Location { get; set; }

    }

    public class Location
    {
        public string City { get; set; }
        public string State { get; set; }
    }
}
