using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using MachineTest.Data;

namespace MachineTest.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public string SaveProduct(HttpPostedFileBase fb0, ProductModel model)
        {
            string message = "";
            MachineTestEntities db = new MachineTestEntities();
            string filePath = "";
            string fileName = "";
            string sysFileName = "";
            if (fb0 != null && fb0.ContentLength > 0)
            {
                filePath = HttpContext.Current.Server.MapPath("~/Content/img/");
                DirectoryInfo di = new DirectoryInfo(filePath);
                if (!di.Exists)
                {
                    di.Create();
                }
                fileName = fb0.FileName;
                sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb0.FileName);
                fb0.SaveAs(filePath + "//" + sysFileName);
                if (!string.IsNullOrWhiteSpace(fb0.FileName))
                {
                    string afileName = HttpContext.Current.Server.MapPath("~/Content/img/") + "/" + sysFileName;
                }
            }
            var getData = db.tblProducts.Where(p => p.Id == model.Id).FirstOrDefault();

            if (getData == null)
            {
                var savepro = new tblProduct()
                {
                    Name = model.Name,
                    Amount = model.Amount,
                    Description = model.Description,
                    Image = sysFileName,
                };
                db.tblProducts.Add(savepro);
                db.SaveChanges();
                return message;
            }
            else
            {
                getData.Name = model.Name;
                getData.Amount = model.Amount;
                getData.Description = model.Description;
                getData.Image = model.Image;
            };
            db.SaveChanges();
            message = "Updated Sucessfully";
            return message;
        }

        public List<ProductModel> GetList()
        {
            MachineTestEntities Db = new MachineTestEntities();
            List<ProductModel> lstpro = new List<ProductModel>();
            var GetList = Db.tblProducts.ToList();
            if (GetList != null)
            {
                foreach (var product in GetList)
                {
                    lstpro.Add(new ProductModel()
                    {
                        Id = product.Id,
                        Name = product.Name,
                        Amount = product.Amount,
                        Description = product.Description,
                        Image = product.Image,
                    });
                }
            }
            return lstpro;
        }
        public ProductModel EditProduct(int id)
        {
            string Message = "";
            ProductModel model = new ProductModel();
            MachineTestEntities db = new MachineTestEntities();
            var edititem = db.tblProducts.Where(p => p.Id == id).FirstOrDefault();
            if (edititem != null)
            {
                model.Id = edititem.Id;
                model.Name = edititem.Name;
                model.Amount = edititem.Amount;
                model.Description = edititem.Description;
                model.Image = edititem.Image;
            }
            Message = "Update ";
            return model;
        }
    }
}