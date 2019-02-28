using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroClientes.Models
{
    public class ClienteDataAccessLayer
    {
        DBContext db = new DBContext();

        public async Task<IEnumerable<Cliente>> GetCliente(int page, int pageSize)
        {
            try
            {
                return await db.Cliente.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Cliente>> GetClienteByName(string name, int pageSize)
        {
            try
            {
                return await db.Cliente.Where(x => x.Nome.Trim().ToUpper().Contains(name.Trim().ToUpper())).Take(pageSize).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> GetTotalCountAsync()
        {
            try
            {
                return await db.Cliente.CountAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> GetTotalCountByNameAsync(string name)
        {
            try
            {
                return await db.Cliente.Where(x => x.Nome.Trim().ToUpper().Contains(name.Trim().ToUpper())).CountAsync();
            }
            catch
            {
                throw;
            }
        }

        public int AddCliente(Cliente cliente)
        {
            try
            {
                db.Cliente.Add(cliente);
                db.SaveChanges();

                foreach(var endereco in cliente.Endereco) {
                    endereco.ClienteId = cliente.ClienteId;
                    endereco.EnderecoId = 0;
                    db.Endereco.Add(endereco);
                }                
                
                foreach(var telefone in cliente.Telefone) {
                    telefone.ClienteId = cliente.ClienteId;
                    db.Telefone.Add(telefone);
                }
                
                foreach(var redeSocial in cliente.RedeSocial) {
                    redeSocial.ClienteId = cliente.ClienteId;
                    db.RedeSocial.Add(redeSocial);
                }
                
                db.SaveChanges();
                
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateCliente(Cliente cliente)
        {
            try
            {

                db.Entry(cliente).State = EntityState.Modified;
                db.SaveChanges();

                foreach(var endereco in cliente.Endereco) {
                    if (endereco.EnderecoId == 0){
                        endereco.ClienteId = cliente.ClienteId;
                        db.Endereco.Add(endereco);
                    }
                    else{
                        db.Entry(endereco).State = EntityState.Modified;
                    }
                }                
                
                foreach(var telefone in cliente.Telefone) {
                    if (telefone.TelefoneId == 0){
                        telefone.ClienteId = cliente.ClienteId;
                        db.Telefone.Add(telefone);
                    }
                    else{
                        db.Entry(telefone).State = EntityState.Modified;
                    }
                }
                
                foreach(var redeSocial in cliente.RedeSocial) {
                    if (redeSocial.RedeSocialId == 0){
                        redeSocial.ClienteId = cliente.ClienteId;
                        db.RedeSocial.Add(redeSocial);
                    }
                    else{
                        db.Entry(redeSocial).State = EntityState.Modified;
                    }
                }
                
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Cliente GetClienteData(int id)
        {
            try
            {
                Cliente cliente = db.Cliente.Find(id);
                
                cliente.Endereco = db.Endereco.Where(x => x.ClienteId == id).ToList();
                cliente.Telefone = db.Telefone.Where(x => x.ClienteId == id).ToList();
                cliente.RedeSocial = db.RedeSocial.Where(x => x.ClienteId == id).ToList();
                
                return cliente;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteCliente(int id)
        {
            try
            {
                Cliente cliente = db.Cliente.Find(id);
                IEnumerable<Endereco> enderecos = db.Endereco.Where(x => x.ClienteId == id);
                IEnumerable<Telefone> telefones = db.Telefone.Where(x => x.ClienteId == id);
                IEnumerable<RedeSocial> redesSociais = db.RedeSocial.Where(x => x.ClienteId == id);

                db.Cliente.Remove(cliente);
                db.Endereco.RemoveRange(enderecos);
                db.Telefone.RemoveRange(telefones);
                db.RedeSocial.RemoveRange(redesSociais);

                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public List<TipoEndereco> GetTipoEndereco()
        {
            List<TipoEndereco> listaTipoEndereco = new List<TipoEndereco>();
            listaTipoEndereco = (from ListaTipoEndereco in db.TipoEndereco select ListaTipoEndereco).ToList();

            return listaTipoEndereco;
        }

        public List<TipoTelefone> GetTipoTelefone()
        {
            List<TipoTelefone> listaTipoTelefone = new List<TipoTelefone>();
            listaTipoTelefone = (from ListaTipoTelefone in db.TipoTelefone select ListaTipoTelefone).ToList();

            return listaTipoTelefone;
        }

        public List<TipoRedeSocial> GetTipoRedeSocial()
        {
            List<TipoRedeSocial> listaTipoRedeSocial = new List<TipoRedeSocial>();
            listaTipoRedeSocial = (from ListaTipoRedeSocial in db.TipoRedeSocial select ListaTipoRedeSocial).ToList();

            return listaTipoRedeSocial;
        }
    }
}
