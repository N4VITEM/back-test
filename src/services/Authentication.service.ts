import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { JwtService } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';
import { CreateUsersDto } from "src/DTO/Users.dto";

@Injectable()
export class AuthenticationService {
    constructor( private readonly usersService: UsersService, private readonly jwtService: JwtService ){}

    async register(createUsersDto: CreateUsersDto): Promise<void> {
        this.usersService.create(createUsersDto)
    }

    async validate(email: string, password: string): Promise<string>{
        const user = await this.usersService.getByEmail(email)

        if (password != user.password) {
            throw new NotFoundException
        }
        else {
            return jwt.sign('abc', 'secret')
        }
    }
}