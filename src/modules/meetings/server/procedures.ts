
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; //todo=> tRPC router basically ek way hai apne API endpoints ko organize karne ka. Think of it as ek central hub jahan tum apne saare procedures (functions) define karte ho.
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql, } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAXIMUM_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";
import { MeetingStatus } from "../types";


export const meetingsRouter = createTRPCRouter({

    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {

        const [removedMeeting] = await db.delete(meetings).where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))).returning();
        if (!removedMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
        }
        return removedMeeting;

    }),


    update: protectedProcedure.input(meetingsUpdateSchema).mutation(async ({ ctx, input }) => {

        const [updatedMeeting] = await db.update(meetings).set(input).where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))).returning();
        if (!updatedMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
        }
        return updatedMeeting;

    }),

    create: protectedProcedure
        .input(meetingsInsertSchema) // ✅ Plus schema name fix karna hai
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db.insert(meetings).values({
                ...input,
                userId: ctx.auth.user.id
            }).returning()
            return createdMeeting;
        }),

    // Video Calling Agent Adding Here :- in Future

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => { // todo => aur pta hai yedi yeha per mai protectedProcedure nhi lagata to mere meetings ke  data ko koi bhi dekh sakta tha isiliye maine yeha per baseProcedure ke place per protectedProcedure laga diya aab fully secure rahega 
        const [existingMeeting] = await db.select({
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at-started_at))`.as("duration")

        }).from(meetings)
            .innerJoin(agents, eq(agents.id, meetings.agentId))
            .where(
                and
                    (
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
            )


        if (!existingMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Meeting Not Found" })
        }
        // await new Promise((resolve) => setTimeout(resolve, 5000))


        return existingMeeting;
    }),
    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAXIMUM_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish(),
            agentId: z.string().nullish(),
            status: z.enum([MeetingStatus.Upcoming, MeetingStatus.Completed, MeetingStatus.Active, MeetingStatus.Processing, MeetingStatus.Cancelled]).nullish()
        }))
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize, status, agentId } = input
            const data = await db.select({
                ...getTableColumns(meetings),
                agent: agents,
                duration: sql<number>`EXTRACT(EPOCH FROM (ended_at-started_at))`.as("duration")
            }).from(meetings)
                .innerJoin(agents, eq(agents.id, meetings.agentId))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        input?.search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.status, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined
                    )
                )

                .orderBy(desc(meetings.createdAt), desc(meetings.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)


            const [total] = await db.select({ count: count() })
                .from(meetings)
                .innerJoin(agents, eq(agents.id, meetings.agentId))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        input?.search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.status, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined
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


