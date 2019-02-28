using System;
using System.Collections.Generic;

namespace CadastroClientes.Models
{
    public partial class RedeSocial
    {
        public int RedeSocialId { get; set; }
        public string Link { get; set; }
        public int ClienteId { get; set; }
        public int TipoRedeSocialId { get; set; }
    }
}
