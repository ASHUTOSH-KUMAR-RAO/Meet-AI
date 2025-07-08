
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init"; //todo=> tRPC router basically ek way hai apne API endpoints ko organize karne ka. Think of it as ek central hub jahan tum apne saare procedures (functions) define karte ho.


export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 5000))


        return data;
    })
})