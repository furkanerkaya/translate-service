import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import translateRoutes from "./routes/translateRoutes";
const app = express();
app.use(bodyParser.json());

app.use("/translate", translateRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy API running on http://localhost:${PORT}`);
});
