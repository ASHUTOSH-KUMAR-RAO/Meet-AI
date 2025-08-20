
import { z } from "zod"

export const agentsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is Requierd" }),
    instruction: z.string().min(1, { message: "Instruction are Requierd" })
})


export const agentUpdateSchema = agentsInsertSchema.extend({
    id: z.string().min(1, { message: "Id is Required" })
})