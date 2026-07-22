import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { users, type User } from '../database/schema';

interface CreateUserInput {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  selectedCourses?: string[];
}

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const now = new Date();
    const [createdUser] = await this.databaseService.db
      .insert(users)
      .values({
        id: input.id,
        email: input.email,
        name: input.name,
        passwordHash: input.passwordHash,
        selectedCourses: input.selectedCourses ?? [],
        profileData: {},
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (createdUser === undefined) {
      throw new InternalServerErrorException('User could not be created.');
    }

    return createdUser;
  }
}
