using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Model
{
    public class MyContext:DbContext
    {
        
        public MyContext(DbContextOptions options) : base(options)
        {
            
        }
        public  DbSet<Product> Products { get; set; }
    }
}
