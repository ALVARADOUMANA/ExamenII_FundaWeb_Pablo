using Backend.DTO;
using Backend.Services.Interfaces;
using DAL.Interfaces;
using Entities.Entities;

namespace Backend.Services.Implementations
{
    public class DepartmentService : IDepartmentService
    {
        IUnidadDeTrabajo _unidadDeTrabajo;
        public DepartmentService(IUnidadDeTrabajo unidad)
        {
            _unidadDeTrabajo = unidad;
        }

        DepartmentDTO Convertir(Department department)
        {
            return new DepartmentDTO
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                Budget = department.Budget,
                StartDate = department.StartDate
            };
        }

        Department Convertir(DepartmentDTO department)
        {
            return new Department
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                Budget = department.Budget,
                StartDate = department.StartDate
            };
        }

        public DepartmentDTO AddDepartment(DepartmentDTO department)
        {
            _unidadDeTrabajo.DepartmentDAL.Add(Convertir(department));
            _unidadDeTrabajo.Complete();
            return department;
        }

        public DepartmentDTO DeleteDepartment(int id)
        {
            var shipper = new Department { DepartmentId = id };
            _unidadDeTrabajo.DepartmentDAL.Remove(shipper);
            _unidadDeTrabajo.Complete();
            return Convertir(shipper);
        }

        public List<DepartmentDTO> GetDepartments()
        {
            var empleados = _unidadDeTrabajo.DepartmentDAL.Get();
            List<DepartmentDTO> empleadoDTOs = new List<DepartmentDTO>();
            foreach (var department in empleados)
            {
                empleadoDTOs.Add(this.Convertir(department));
            }
            return empleadoDTOs;
        }

        public DepartmentDTO GetDepartmentById(int id)
        {
            var result = _unidadDeTrabajo.DepartmentDAL.FindById(id);
            return Convertir(result);
        }

        public DepartmentDTO UpdateDepartment(DepartmentDTO department)
        {
            var entity = Convertir(department);
            _unidadDeTrabajo.DepartmentDAL.Update(entity);
            _unidadDeTrabajo.Complete();

            return department;
        }
    }
}
