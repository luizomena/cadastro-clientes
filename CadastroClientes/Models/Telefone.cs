using System;
using System.Collections.Generic;

namespace CadastroClientes.Models
{
    public partial class Telefone
    {
        public int TelefoneId { get; set; }
        public string Numero { get; set; }
        public int ClienteId { get; set; }
        public int TipoTelefoneId { get; set; }
    }
}
