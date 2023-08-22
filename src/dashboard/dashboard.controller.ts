import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@Controller('dashboard')
export class DashboardController {

    @UseGuards(JwtAuthGuard)
    @Get()
    async myDashboard(@Request() request) {
        const user = request.user
        return {
            message: `Welcome to your dashboard ${user.username}`
        }
    }
}
