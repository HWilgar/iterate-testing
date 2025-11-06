import { Router } from "express";
import { userData } from "../controller/iterate.controller.js";

const iterateRouter = Router();

iterateRouter.get('/', userData);

export default iterateRouter;