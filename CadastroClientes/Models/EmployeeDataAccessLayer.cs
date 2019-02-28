using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroClientes.Models
{
    public class EmployeeDataAccessLayer
    {
        myTestDBContext db = new myTestDBContext();

        public async Task<IEnumerable<TblEmployee>> GetAllEmployees(int page, int pageSize)
        {
            try
            {
                return await db.TblEmployee.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            }
            catch
            {
                throw;
            }
        }
        
        public async Task<IEnumerable<TblEmployee>> GetEmployeeByName(string name, int pageSize)
        {
            try
            {
                return await db.TblEmployee.Where(x => x.Name.Trim().ToUpper().Contains(name.Trim().ToUpper())).Take(pageSize).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> GetTotalCountAsync()
        {
            try
            {
                return await db.TblEmployee.CountAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> GetTotalCountByNameAsync(string name)
        {
            try
            {
                return await db.TblEmployee.Where(x => x.Name.Trim().ToUpper().Contains(name.Trim().ToUpper())).CountAsync();
            }
            catch
            {
                throw;
            }
        }
        
        public int AddEmployee(TblEmployee employee)
        {
            try
            {
                db.TblEmployee.Add(employee);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        
        public int UpdateEmployee(TblEmployee employee)
        {
            try
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }
        
        public TblEmployee GetEmployeeData(int id)
        {
            try
            {
                TblEmployee employee = db.TblEmployee.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }
        
        public int DeleteEmployee(int id)
        {
            try
            {
                TblEmployee emp = db.TblEmployee.Find(id);
                db.TblEmployee.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        
        public List<TblCities> GetCities()
        {
            List<TblCities> lstCity = new List<TblCities>();
            lstCity = (from CityList in db.TblCities select CityList).ToList();

            return lstCity;
        }
    }
}
