import { Hono } from "hono";
import { Bindings } from "./bindings";

export const Router = () => new Hono<{ Bindings: Bindings }>()
