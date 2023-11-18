import express from "express";
const router = express.Router();
import {
  Register,
  Login
} from "../controller/usersCont.js";

router.route("/login").post(Login)
router.route("/register").post(Register)



// router.route("/:id").get(getSingleuser).delete(DeleteUser).put(updateuser);

export default router;

//Router.get("/", getAllnotes); //**Route All Notes */
//Router.post("/", AddNewnotes); //**Route Add New Notes *
//Router.get("/:id", getSinglenotes); //**Route Single Notes */
//Router.delete("/:id", DeleteNotes); //**Route Delete Notes *
//Router.put("/:id", updatenotes); //**Route Update  Notes *
