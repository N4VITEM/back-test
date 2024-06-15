import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/DTO/Authentication.dto';
import { CreateUsersDto } from 'src/DTO/Users.dto';
import { AuthenticationService } from 'src/services/Authentication.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthenticationService) { }

    @Post('login')
    async login(@Body() req: LoginDto): Promise<string> {
        return this.authService.validate(
            req.email,
            req.password
        );
    }

    @Post('register')
    async register(@Body() createUsersDto: CreateUsersDto): Promise<void> {
        await this.authService.register(createUsersDto);
    }
}
