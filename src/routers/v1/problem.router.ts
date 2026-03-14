import express from "express";
import { validateRequestBody, validateRequestParams } from "../../validators";
import { ProblemRepository } from "../../repositories/problem.repository";
import { ProblemService } from "../../services/problem.service";
import { ProblemController } from "../../controllers/problem.controller";
import {
  createProblemSchema,
  findByDifficultySchema,
  updateProblem,
} from "../../validators/problem.validator";

const problemRouter = express.Router();

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);

problemRouter.post(
  "/",
  validateRequestBody(createProblemSchema),
  problemController.createProblem,
);
problemRouter.get("/:id", problemController.getProblemById);
problemRouter.get("/", problemController.getAllProblems);
problemRouter.put(
  "/:id",
  validateRequestBody(updateProblem),
  problemController.updateProblem,
);
problemRouter.delete("/:id", problemController.deleteProblem);
problemRouter.get(
  "/difficulty/:difficulty",
  validateRequestParams(findByDifficultySchema),
  problemController.findByDifficulty,
);
problemRouter.get("/search", problemController.searchProblems);

export default problemRouter;
