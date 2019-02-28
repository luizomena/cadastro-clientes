using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CadastroClientes.Models;
using Microsoft.AspNetCore.Mvc;

namespace CadastroClientes.Controllers
{

    public class ClienteController : Controller
    {
        ClienteDataAccessLayer objCliente = new ClienteDataAccessLayer();

        [HttpGet]
        [Route("api/Cliente/Index")]
        public async Task<PagedResultResponse<Cliente>> Index([FromQuery]int page, [FromQuery]int pageSize)
        {
            return new PagedResultResponse<Cliente>
            {
                Results = await objCliente.GetCliente(page, pageSize),
                TotalCount = await objCliente.GetTotalCountAsync()
            };
        }

        [HttpGet]
        [Route("api/Cliente/GetClienteByName/{name}")]
        public async Task<PagedResultResponse<Cliente>> GetClienteByName(string name, [FromQuery]int pageSize)
        {
            return new PagedResultResponse<Cliente>
            {
                Results = await objCliente.GetClienteByName(name, pageSize),
                TotalCount = await objCliente.GetTotalCountByNameAsync(name)
            };
        }

        [HttpPost]
        [Route("api/Cliente/Create")]
        public int Create([FromBody] Cliente cliente)
        {
            return objCliente.AddCliente(cliente);
        }

        [HttpGet]
        [Route("api/Cliente/Details/{id}")]
        public Cliente Details(int id)
        {
            return objCliente.GetClienteData(id);
        }

        [HttpPut]
        [Route("api/Cliente/Edit")]
        public int Edit([FromBody]Cliente cliente)
        {
            return objCliente.UpdateCliente(cliente);
        }

        [HttpDelete]
        [Route("api/Cliente/Delete/{id}")]
        public int Delete(int id)
        {
            return objCliente.DeleteCliente(id);
        }

        /*[HttpDelete]
        [Route("api/Cliente/Endereco/Delete/{id}")]
        public int DeleteEndereco(int id)
        {
            return objCliente.DeleteEndereco(id);
        }*/

        [HttpGet]
        [Route("api/Cliente/GetTipoEndereco")]
        public IEnumerable<TipoEndereco> GetTipoEndereco()
        {
            return objCliente.GetTipoEndereco();
        }

        [HttpGet]
        [Route("api/Cliente/GetTipoTelefone")]
        public IEnumerable<TipoTelefone> GetTipoTelefone()
        {
            return objCliente.GetTipoTelefone();
        }

        [HttpGet]
        [Route("api/Cliente/GetTipoRedeSocial")]
        public IEnumerable<TipoRedeSocial> GetTipoRedeSocial()
        {
            return objCliente.GetTipoRedeSocial();
        }
    }

}
