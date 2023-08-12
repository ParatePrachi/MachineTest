using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MachineTest.Models;

namespace MachineTest.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListIndex()
        {
            return View();
        }
        public ActionResult SaveProduct(ProductModel model)
        {
            try
            {
                HttpPostedFileBase fb0 = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb0 = Request.Files[0];
                }
                return Json(new { Message = (new ProductModel().SaveProduct(fb0, model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Getlist()
        {
            try
            {
                return Json(new { model = new ProductModel().GetList() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }
        public ActionResult EditProduct(int id)
        {
            try
            {
                return Json(new { model = (new ProductModel().EditProduct(id)) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}