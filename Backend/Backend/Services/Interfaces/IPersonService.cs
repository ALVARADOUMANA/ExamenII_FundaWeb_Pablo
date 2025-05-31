using Backend.DTO;
using Entities.Entities;

namespace Backend.Services.Interfaces
{
    public interface IPersonService
    {
        List<PersonDTO> GetPersons();
        PersonDTO GetPersonById(int id);
        PersonDTO AddPerson(PersonDTO person);
        PersonDTO UpdatePerson(PersonDTO person);
        PersonDTO DeletePerson(int id);
    }
}
