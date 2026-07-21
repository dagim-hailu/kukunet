import { Controller, Get } from '@nestjs/common';

interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
