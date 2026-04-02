import express from "express";
import cors from "cors";
import routes from "./routes";

import path from "path";
import uploadRoutes from "./modules/uploads/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", routes);

export default app;