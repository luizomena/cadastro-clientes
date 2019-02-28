using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroClientes.Models
{
    public class PagedResultResponse<T> where T : class
    {
        public IEnumerable<T> Results { get; set; }
        public int TotalCount { get; set; }
    }
}
