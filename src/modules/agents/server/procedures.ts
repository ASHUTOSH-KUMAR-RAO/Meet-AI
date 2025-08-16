
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; //todo=> tRPC router basically ek way hai apne API endpoints ko organize karne ka. Think of it as ek central hub jahan tum apne saare procedures (functions) define karte ho.
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";


export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => { // todo => aur pta hai yedi yeha per mai protectedProcedure nhi lagata to mere agents ke  data ko koi bhi dekh sakta tha isiliye maine yeha per baseProcedure ke place per protectedProcedure laga diya aab fully secure rahega 
        const [existingData] = await db.select().from(agents).where(eq(agents.id, input.id))

        // await new Promise((resolve) => setTimeout(resolve, 5000))


        return existingData;
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 5000))


        return data;
    }),
    create: protectedProcedure
        .input(agentsInsertSchema) // ✅ Plus schema name fix karna hai
        .mutation(async ({ input, ctx }) => {
            const [createAgent] = await db.insert(agents).values({
                ...input,
                userId: ctx.auth.user.id
            }).returning()
            return createAgent;
        })
})



/* Query 📖

Purpose: Data read karne ke liye
Side Effects: Koi nahi - database state change nahi hota
HTTP Method: GET ke similar
Examples: Get users, fetch posts, search data

Mutation ✏️

Purpose: Data write/modify karne ke liye
Side Effects: Hote hain - database state change hota hai
HTTP Method: POST/PUT/DELETE ke similar
Examples: Create user, update post, delete record

*/


