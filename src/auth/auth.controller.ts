import { Controller, Get, Post } from '@nestjs/common';
import { AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("login")
    getLogin(){
        return this.authService.getLogin();
    }

    @Post("login")
    login(){
        return this.authService.login();
    }

    @Get("signup")
    getSignup(){
        return this.authService.getSignup();
    }
    @Post("signup")
    signup(){
        return this.authService.signup();
    }
}
