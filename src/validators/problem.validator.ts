import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  editorials: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1),
        output: z.string().min(1),
      }),
    )
    .optional(),
});

export const updateProblem = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  editorials: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1),
        output: z.string().min(1),
      }),
    )
    .optional(),
});

export const findByDifficultySchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]),
});

// export const searchProblemSchema = z.object({
//   query: z.string().min(1),
// });

export type CreateProblemDto = z.infer<typeof createProblemSchema>;
export type UpdateProblemDto = z.infer<typeof updateProblem>;
