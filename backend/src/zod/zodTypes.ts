import { z } from "zod";



export const stockSchema = z.object({
    name: z.string().min(1).max(5).uppercase(),
})
