import {
  Injectable,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { AppConfigService } from '../config/app-config.service';
import * as schema from './schema';

export type AppDatabase = PostgresJsDatabase<typeof schema>;
type PostgresClient = ReturnType<typeof postgres>;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly client: PostgresClient | null;
  private readonly databaseInstance: AppDatabase | null;

  constructor(private readonly appConfigService: AppConfigService) {
    const databaseUrl = this.appConfigService.getDatabaseUrl();

    if (databaseUrl === null) {
      this.client = null;
      this.databaseInstance = null;
      return;
    }

    this.client = postgres(databaseUrl, {
      max: 10,
      prepare: false,
    });
    this.databaseInstance = drizzle(this.client, { schema });
  }

  get db(): AppDatabase {
    if (this.databaseInstance === null) {
      throw new ServiceUnavailableException('Database is not configured.');
    }

    return this.databaseInstance;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client !== null) {
      await this.client.end({ timeout: 5 });
    }
  }
}
