using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communityapp_aspnetcore_tswebpack.Controllers
{
    public interface IJsonFileReader
    {
        string Read(string fileName);
    }
}
