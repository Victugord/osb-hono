import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Router } from "../../helper/app";
import { AccountinSaft, AccountinSaftSchema } from "../../helper/saft";

export const accountingSaftRoutes = Router()
  .get("/", (c) => {
    return c.jsonT("Hello World");
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        body: z.string(),
      })
    ),
    async (c) => {
      const body: AccountinSaft = await c.req.json();

      return c.jsonT({
        version: body.AuditFile.Header.AuditFileVersion,
      });
    }
  );
