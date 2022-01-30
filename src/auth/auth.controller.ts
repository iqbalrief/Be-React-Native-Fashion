import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/Models/user.entity';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGUard, RtGUard } from './common/guards';
import { SigninDto } from './dto/Signin.dto';
import { Tokens } from './types';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body () SignUpDto): Promise <Tokens> {
     return this.authService.signupLocal(SignUpDto);
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body()dto: SigninDto): Promise <Tokens> {
        return this.authService.signinLocal(dto);
    }

    @UseGuards(AtGUard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
    console.log(userId)
    return this.authService.logout(userId);
    }

    @UseGuards(RtGUard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string) {
     return this.authService.refreshTokens(userId, refreshToken);
    }
 }
