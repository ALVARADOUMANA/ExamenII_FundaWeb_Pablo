using Backend.Controllers;
using Backend.DTO;
using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public IEnumerable<PersonDTO> Get()
        {
            return _personService.GetPersons();
        }

        [HttpGet("{id}")]
        public PersonDTO Get(int id)
        {
            return _personService.GetPersonById(id);
        }

        [HttpPost]
        public void Post([FromBody] PersonDTO person)
        {
            _personService.AddPerson(person);
        }

        [HttpPut]
        public void Put([FromBody] PersonDTO person)
        {
            _personService.UpdatePerson(person);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _personService.DeletePerson(id);
        }
    }
}
