import { z } from "zod";

const REGEX_MONTH: RegExp = /^\d{4}-(0[1-2]|1[0-2])$/;

export const getDRESchema = z.object({
  query: z.object({
    vertical: z.string().min(1, "Vertical can not be empty"),
    month: z.string().regex(REGEX_MONTH, {
      message: "Month should have the format YYYY-MM",
    }),
  }),
});

export type GetDreDTO = z.infer<typeof getDRESchema>["query"];
