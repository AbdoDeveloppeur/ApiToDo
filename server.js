import dotenv from "dotenv"; // ** Import environments variables //
const envFilePath = "config/.env"; // ** Path for .Env
dotenv.config({path:envFilePath}); // ** Config DotEnv
import cors from "cors"; // ** Import cross origin Ressource
import { CorsOptions } from "./midlware/CrossOrigin.js"; // ** Config Cors
import express from "express"; //*import package expressjs //
import mongoose from "mongoose"; // ** import package mongoose //
//import morgan from "morgan"; // ** import morgane //
import notesRoute from "./route/notesRoute.js"; // ** import All Routes Notes //
import usersRoute from "./route/userRoute.js"; // ** import All Users Notes //

import { connectDb } from "./config/DbConnect.js"; //** connection with database
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // ** ExpressJson
app.use(cors(CorsOptions)); //** Cors

//app.use(morgan("dev"));
app.use("/api/v1/notes", notesRoute); //  Route Notes //
app.use("/api/v1/users/", usersRoute); //  Route Login //
//app.use("/api/v1/users", usersRoute); //  Route Users //
//app.use("/api/v1/users/register", registerRoute); //  Route Users //

process.env.Data_URI;
// check dabase and server //
connectDb();
mongoose.connection.once("open", () => {
  console.log(`Db is connected`);
  app.listen(PORT, () => {
    console.log(`Server is connected  at port ${PORT} `);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1); //stope application //
});
