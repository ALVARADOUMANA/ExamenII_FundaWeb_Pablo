namespace Backend.DTO
{
    public class DepartmentDTO
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; } = null!;
        public decimal Budget { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
    }
}
