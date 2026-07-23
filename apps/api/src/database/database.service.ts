import {
  Injectable,
  OnModuleDestroy,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { AppConfigService } from '../config/app-config.service';
import * as schema from './schema';

export type AppDatabase = PostgresJsDatabase<typeof schema>;
type PostgresClient = ReturnType<typeof postgres>;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly client: PostgresClient | null;
  private readonly databaseInstance: AppDatabase | null;

  constructor(private readonly appConfigService: AppConfigService) {
    const databaseUrl = this.appConfigService.getDatabaseUrl();

    if (databaseUrl === null) {
      this.logger.warn("Database URL not provided, database not configured");
      this.client = null;
      this.databaseInstance = null;
      return;
    }

    try {
      this.logger.log("Connecting to database...");
      this.client = postgres(databaseUrl, {
        max: 10,
        prepare: false,
      });
      this.databaseInstance = drizzle(this.client, { schema });
      this.logger.log("Database connection established successfully");
    } catch (error) {
      this.logger.error("Failed to connect to database:", error);
      this.client = null;
      this.databaseInstance = null;
    }
  }

  get db(): AppDatabase {
    if (this.databaseInstance === null) {
      throw new ServiceUnavailableException('Database is not configured.');
    }

    return this.databaseInstance;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client !== null) {
      this.logger.log("Closing database connection...");
      await this.client.end({ timeout: 5 });
      this.logger.log("Database connection closed");
    }
  }
}
