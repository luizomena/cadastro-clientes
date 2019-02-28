using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroClientes.Models
{
    public partial class RedeSocial
    {
        public int RedeSocialId { get; set; }
        public string Link { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        
        [ForeignKey("TipoRedeSocial")]
        public int TipoRedeSocialId { get; set; }
    }
}
