using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementation
{
    public class UnidadDeTrabajo : IUnidadDeTrabajo
    {

        PruContext context;

        public UnidadDeTrabajo(PruContext context)
        {
            this.context = context;
        }
        public void Dispose()
        {
            this.context.Dispose();
        }

        public void Complete()
        {
            context.SaveChanges();
        }
    }
}

