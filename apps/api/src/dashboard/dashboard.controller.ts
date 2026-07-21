import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { RequestUser } from '../auth/auth.types';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { DashboardService } from './dashboard.service';
import type { DashboardSummaryResponse } from './dashboard.types';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AccessTokenGuard)
  @Get('summary')
  async getSummary(
    @CurrentUser() requestUser: RequestUser,
  ): Promise<DashboardSummaryResponse> {
    return this.dashboardService.getSummary(requestUser);
  }
}
