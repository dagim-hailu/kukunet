import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { sessions, type Session } from '../database/schema';

interface CreateSessionInput {
  sessionId: string;
  userId: string;
  refreshTokenHash: string;
  userAgent: string | null;
  ipAddress: string | null;
  expiresAt: Date;
}

interface RotateSessionInput {
  refreshTokenHash: string;
  userAgent: string | null;
  ipAddress: string | null;
  expiresAt: Date;
}

@Injectable()
export class SessionsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createSession(input: CreateSessionInput): Promise<Session> {
    const now = new Date();
    const [createdSession] = await this.databaseService.db
      .insert(sessions)
      .values({
        id: input.sessionId,
        userId: input.userId,
        refreshTokenHash: input.refreshTokenHash,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
        expiresAt: input.expiresAt,
        lastUsedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (createdSession === undefined) {
      throw new InternalServerErrorException('Session could not be created.');
    }

    return createdSession;
  }

  async findActiveSessionById(sessionId: string): Promise<Session | null> {
    const [session] = await this.databaseService.db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.id, sessionId),
          isNull(sessions.revokedAt),
          gt(sessions.expiresAt, new Date()),
        ),
      )
      .limit(1);

    return session ?? null;
  }

  async rotateSession(
    sessionId: string,
    input: RotateSessionInput,
  ): Promise<Session | null> {
    const now = new Date();
    const [updatedSession] = await this.databaseService.db
      .update(sessions)
      .set({
        refreshTokenHash: input.refreshTokenHash,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
        expiresAt: input.expiresAt,
        lastUsedAt: now,
        updatedAt: now,
      })
      .where(and(eq(sessions.id, sessionId), isNull(sessions.revokedAt)))
      .returning();

    return updatedSession ?? null;
  }

  async revokeSession(sessionId: string): Promise<boolean> {
    const now = new Date();
    const revokedSessions = await this.databaseService.db
      .update(sessions)
      .set({
        revokedAt: now,
        updatedAt: now,
      })
      .where(and(eq(sessions.id, sessionId), isNull(sessions.revokedAt)))
      .returning({ id: sessions.id });

    return revokedSessions.length > 0;
  }

  async countActiveSessionsForUser(userId: string): Promise<number> {
    const activeSessions = await this.databaseService.db
      .select({ id: sessions.id })
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          isNull(sessions.revokedAt),
          gt(sessions.expiresAt, new Date()),
        ),
      );

    return activeSessions.length;
  }

  async findRecentSessionsForUser(
    userId: string,
    limit = 3,
  ): Promise<Session[]> {
    return this.databaseService.db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(desc(sessions.lastUsedAt))
      .limit(limit);
  }
}
