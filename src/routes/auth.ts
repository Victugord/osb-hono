import { Router } from "../helper/app";

export const authRoutes = Router().get("/", (c) => {
  return c.jsonT("Hello World");
});
