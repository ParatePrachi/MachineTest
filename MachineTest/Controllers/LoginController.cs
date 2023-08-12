using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MachineTest.Models;

namespace MachineTest.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult LoginIndex()
        {
            return View();
        }
        public ActionResult LoginIn(LoginModel model)
        {

            if (ModelState.IsValid)
            {
                if (model.UserName == "Admin" && model.Password == "1234")
                {
                    return RedirectToAction("UserDashbord");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid Username And Password");
                }
            }
            return View("..\\Login\\LoginIndex", model);
        }
        public ActionResult UserDashbord()
        {
            return View("..\\Product\\Index");
        }
    }
}