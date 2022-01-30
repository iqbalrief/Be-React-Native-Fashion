import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/Signin.dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
 

@Injectable()
export class AuthService {
    constructor( 
    private jwtService: JwtService,
    private readonly userService: UserService
    ) {}

   async signupLocal(dto: SigninDto): Promise<Tokens>{
        const hash = await this.hashData(dto.password);
        const newUser =  await this.userService.create(dto)

        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens;
    }

    async signinLocal(dto: SigninDto) {
        const user = await this.userService.findOne({
            email: dto.email,
        });

        if(!user) throw new ForbiddenException('User not found');
        
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) throw new ForbiddenException('User Not Found')
        
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }


    async logout(userId: number) {
        await this.userService.updateUser({id: userId, hashedRt: ""})
    }

    async refreshTokens(userId: number, rt: string) {
        const user = await this.userService.findById(userId)

        if(!user) throw new ForbiddenException('User not found');
        
        const RtMatches = await bcrypt.compare(user.hashedRt, rt);
        if (!RtMatches) throw new ForbiddenException('Acces Denied')
        
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt)
        await this.userService.update(userId, hash)
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

  async getTokens(userId: number, email: string): Promise<Tokens> {
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
        {
            sub: userId,
            email,
        }, 
        {
            secret: 'at-secret',
            expiresIn: 60 * 15,
        },
        ),
    
      this.jwtService.signAsync({
          sub: userId,
          email,
      }, {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
        access_token: at,
        refresh_token: rt
    }
  }

}
