using System;
using System.Collections.Generic;

namespace Entities.Entities;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Budget { get; set; }

    public DateTime StartDate { get; set; }

    public int? Administrator { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
