import { z } from "zod";

export const signInBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
