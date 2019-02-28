using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroClientes.Models
{
    public partial class Telefone
    {
        public int TelefoneId { get; set; }
        public string Numero { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }

        [ForeignKey("TipoTelefone")]
        public int TipoTelefoneId { get; set; }
    }
}
