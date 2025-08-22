
import { z } from "zod"

export const meetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is Requierd" }),
    agentId: z.string().min(1, { message: "Agent are Requierd" })
})


export const meetingsUpdateSchema = meetingsInsertSchema.extend({
    id: z.string().min(1, { message: "Id is Required" })
})