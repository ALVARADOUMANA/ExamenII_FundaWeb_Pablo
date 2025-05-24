using Backend.DTO;
using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public IEnumerable<DepartmentDTO> Get()
        {
            return _departmentService.GetDepartments();
        }

        [HttpGet("{id}")]
        public DepartmentDTO Get(int id)
        {
            return _departmentService.GetDepartmentById(id);
        }

        [HttpPost]
        public void Post([FromBody] DepartmentDTO empleado)
        {
            _departmentService.AddDepartment(empleado);
        }

        [HttpPut]
        public void Put([FromBody] DepartmentDTO empleado)
        {
            _departmentService.UpdateDepartment(empleado);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _departmentService.DeleteDepartment(id);
        }
    }
}
