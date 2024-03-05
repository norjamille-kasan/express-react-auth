import { eq } from "drizzle-orm";
import { db } from "../database";
import { users } from "../database/schemas/users";

export async function createUser(data: typeof users.$inferInsert) {
    return await db.insert(users).values(data);
}

export async function findUserByEmail(email: string) {
    const data = await db.select().from(users).where(eq(users.email, email));
    if (data.length === 0) {
        return null;
    }
    return data[0];
}

export async function findUserById(id: number) {
    const data = await db.select().from(users).where(eq(users.id, id));
    if (data.length === 0) {
        return null;
    }
    return data[0];
}

export async function findUserByJwtVersion(jwtVersion: string) {
    const data = await db
        .select()
        .from(users)
        .where(eq(users.jwtVersion, jwtVersion))
        .limit(1);
    if (data.length === 0) {
        return null;
    }
    return data[0];
}
