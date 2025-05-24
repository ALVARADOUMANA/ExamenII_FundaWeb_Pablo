using Backend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Interfaces
{
    public interface IDepartmentService
    {
        List<DepartmentDTO> GetDepartments();
        DepartmentDTO GetDepartmentById(int id);
        DepartmentDTO AddDepartment(DepartmentDTO department);
        DepartmentDTO UpdateDepartment(DepartmentDTO department);
        DepartmentDTO DeleteDepartment(int id);
    }
}
