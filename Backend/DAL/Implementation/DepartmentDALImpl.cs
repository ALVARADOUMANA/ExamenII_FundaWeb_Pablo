using DAL.Implementation;
using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementation
{
    public class DepartmentDALImpl : GenericDALImpl<Department>, IDepartmentDAL
    {
        SchoolContext SchoolContext { get; set; }
        public DepartmentDALImpl(SchoolContext schoolContext)
            : base(schoolContext)
        {
            this.SchoolContext = schoolContext;
        }
    }
}
