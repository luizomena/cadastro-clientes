using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CadastroClientes.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Endereco = new HashSet<Endereco>();
            RedeSocial = new HashSet<RedeSocial>();
            Telefone = new HashSet<Telefone>();
        }

        public int ClienteId { get; set; }
        public string Nome { get; set; }
        public DateTime Nascimento { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }

        public ICollection<Endereco> Endereco { get; set; }
        public ICollection<RedeSocial> RedeSocial { get; set; }
        public ICollection<Telefone> Telefone { get; set; }
    }
}
