using Backend.DTO;
using Backend.Services.Interfaces;
using DAL.Interfaces;
using Entities.Entities;

namespace Backend.Services.Implementations
{
    public class PersonService : IPersonService
    {
        IUnidadDeTrabajo _unidadDeTrabajo;
        public PersonService(IUnidadDeTrabajo unidad)
        {
            _unidadDeTrabajo = unidad;
        }

        PersonDTO Convertir(Person person)
        {
            return new PersonDTO
            {
                PersonId = person.PersonId,
                LastName = person.LastName,
                FirstName = person.FirstName,
                HireDate = person.HireDate,
                EnrollmentDate = person.EnrollmentDate,
                Discriminator = person.Discriminator
            };
        }

        Person Convertir(PersonDTO person)
        {
            return new Person
            {
                PersonId = person.PersonId,
                LastName = person.LastName,
                FirstName = person.FirstName,
                HireDate = person.HireDate,
                EnrollmentDate = person.EnrollmentDate,
                Discriminator = person.Discriminator
            };
        }

        public PersonDTO AddPerson(PersonDTO person)
        {
            _unidadDeTrabajo.PersonDAL.Add(Convertir(person));
            _unidadDeTrabajo.Complete();
            return person;
        }

        public PersonDTO DeletePerson(int id)
        {
            var shipper = new Person { PersonId = id };
            _unidadDeTrabajo.PersonDAL.Remove(shipper);
            _unidadDeTrabajo.Complete();
            return Convertir(shipper);
        }

        public List<PersonDTO> GetPersons()
        {
            var empleados = _unidadDeTrabajo.PersonDAL.Get();
            List<PersonDTO> empleadoDTOs = new List<PersonDTO>();
            foreach (var person in empleados)
            {
                empleadoDTOs.Add(this.Convertir(person));
            }
            return empleadoDTOs;
        }

        public PersonDTO GetPersonById(int id)
        {
            var result = _unidadDeTrabajo.PersonDAL.FindById(id);
            return Convertir(result);
        }

        public PersonDTO UpdatePerson(PersonDTO person)
        {
            var entity = Convertir(person);
            _unidadDeTrabajo.PersonDAL.Update(entity);
            _unidadDeTrabajo.Complete();

            return person;
        }
    }
    
}
