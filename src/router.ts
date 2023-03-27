import { cors } from "hono/cors";
import { Router } from "./helper/app";
import { accountingRoutes } from "./routes/accounting";
import { authRoutes } from "./routes/auth";

const router = Router()
  .use("*", cors())
  .all("/status", (c) => c.jsonT("OK"))
  .route("/auth", authRoutes)
  .route("/accounting", accountingRoutes);

export default router;
