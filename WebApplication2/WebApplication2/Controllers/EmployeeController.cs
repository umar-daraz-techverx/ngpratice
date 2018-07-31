using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using  System.Drawing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly MyContext _context;
//        public EmployeeController(MyContext myContext)
//        {
//            this._context = myContext;
//        }
        private readonly IHostingEnvironment _env;
        public EmployeeController(IHostingEnvironment env, MyContext myContext)
        {
            this._env = env;
            this._context = myContext;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static List<Employee> emp = new List<Employee>
        {
            new Employee {Id = 1, Name = "umar"},
            new Employee {Id = 2, Name = "yup"},
            new Employee {Id = 3, Name = "draz"}
        };
        [HttpGet("[action]")]
        public IActionResult Index()
        {
            return Ok(emp);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> PostImage()
        {
            var product=new Product();
            var reques = HttpContext.Request.Form.Files["Image"];
            product.Title = HttpContext.Request.Form["Title"];
            product.Discraption = HttpContext.Request.Form["Discraption"];
            // string url = filepath + uno + "_" + ++counter + file.FileName.Substring(file.FileName.LastIndexOf("."));
            string UniquFile = Guid.NewGuid() + "" + reques.FileName.Substring(reques.FileName.LastIndexOf("."));
            var path =Path.Combine(Path.Combine(_env.WebRootPath, "img"), UniquFile);
            product.ImageUrl = Path.Combine("img", UniquFile);

            using (var fc=new FileStream(path,FileMode.Create))
            {
                await reques.CopyToAsync(fc);
            }
            try
            {
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
            return Ok("Data Are Added");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct()
        {
            try
            {
              return Ok(await _context.Products.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                return Ok(await _context.Products.FirstOrDefaultAsync(x=>x.Id==id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
               var product=await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
                if (product != null)
                {
                    _context.Entry(product).State = EntityState.Deleted;
                   await _context.SaveChangesAsync();
                }
                return Ok("data Delete Success fully");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        public IActionResult Add(Employee employee)
        {
            emp.Add(employee);
            return Ok("data Add");
        }
        public class  Employee
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}