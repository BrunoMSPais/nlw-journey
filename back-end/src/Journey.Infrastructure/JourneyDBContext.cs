using Journey.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Journey.Infrastructure
{
    public class JourneyDBContext : DbContext
    {
        public DbSet<Trip> Trips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.
                UseSqlite(
                "Data Source=C:\\development\\Javascript\\pratica\\rocketseat\\NLW\\NLW-Journey\\back-end\\JourneyDatabase.db"
                );
        }
    }
}
