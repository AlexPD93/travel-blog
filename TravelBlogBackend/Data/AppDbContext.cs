using Microsoft.EntityFrameworkCore;
public class AppDbContext : DbContext
{
    public DbSet<MyEntity> MyEntities { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}

public class MyEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
}
