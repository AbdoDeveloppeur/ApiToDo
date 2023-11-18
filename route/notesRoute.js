import express from "express";
const router = express.Router();
import {RequireAuth} from "../midlware/VerifyToken.js";
import {
  getAllnotes,
  AddNewnotes,
  DeleteNotes,
  updatenotes,
} from "../controller/notesCont.js";

// ** Midlware Authorization
router.use(RequireAuth);
router.route("/").get(getAllnotes).post(AddNewnotes);
router.route("/:id").delete(DeleteNotes).put(updatenotes);

//Router.get("/", getAllnotes); //**Route All Notes */
//Router.post("/", AddNewnotes); //**Route Add New Notes *
//Router.get("/:id", getSinglenotes); //**Route Single Notes */
//Router.delete("/:id", DeleteNotes); //**Route Delete Notes *
//Router.put("/:id", updatenotes); //**Route Update  Notes *

export default router;
