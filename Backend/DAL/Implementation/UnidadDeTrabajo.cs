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
        public IDepartmentDAL DepartmentDAL { get; set; }

        SchoolContext context;

        public UnidadDeTrabajo(SchoolContext context, IDepartmentDAL departmentDAL)
        {
            this.context = context;
            DepartmentDAL = departmentDAL;
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

