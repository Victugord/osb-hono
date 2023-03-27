import { Router } from "../../helper/app";
import { accountingSaftRoutes } from "./saft";

export const accountingRoutes = Router().route("/safts", accountingSaftRoutes);
