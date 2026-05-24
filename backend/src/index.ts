import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/", analyzeRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "EcoVision backend corriendo" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});