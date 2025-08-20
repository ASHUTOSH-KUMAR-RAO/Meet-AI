
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; //todo=> tRPC router basically ek way hai apne API endpoints ko organize karne ka. Think of it as ek central hub jahan tum apne saare procedures (functions) define karte ho.
import { agentsInsertSchema, agentUpdateSchema } from "../schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql, } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAXIMUM_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
    update: protectedProcedure.input(agentUpdateSchema).mutation(async ({ ctx, input }) => {

        const [updatedAgent] = await db.update(agents).set(input).where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))).returning();
        if (!updatedAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" })
        }
        return updatedAgent;

    }),
    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {

        const [removedAgent] = await db.delete(agents).where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))).returning();

        if (!removedAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" })
        }
        return removedAgent;
    }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => { // todo => aur pta hai yedi yeha per mai protectedProcedure nhi lagata to mere agents ke  data ko koi bhi dekh sakta tha isiliye maine yeha per baseProcedure ke place per protectedProcedure laga diya aab fully secure rahega 
        const [existingData] = await db.select({
            meetingCount: sql<number>`5`,
            ...getTableColumns(agents),
        }).from(agents).where(
            and
                (
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                )
        )


        if (!existingData) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agents Not Found" })
        }
        // await new Promise((resolve) => setTimeout(resolve, 5000))


        return existingData;
    }),
    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAXIMUM_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish()
        }))
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize } = input
            const data = await db.select({
                meetingCount: sql<number>`5`,
                ...getTableColumns(agents),
            }).from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        input?.search ? ilike(agents.name, `%${search}%`) : undefined
                    )
                )

                .orderBy(desc(agents.createdAt), desc(agents.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)


            const [total] = await db.select({ count: count() })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        input?.search ? ilike(agents.name, `%${search}%`) : undefined
                    )
                )

            const totalPages = Math.ceil(total.count / pageSize)
            // await new Promise((resolve) => setTimeout(resolve, 5000))


            return {
                items: data,
                total: total.count,
                totalPages
            }
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



/*  Query 📖

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


