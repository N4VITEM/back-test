import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUsersDto, UpdateUsersDto } from "src/DTO/Users.dto";
import { Users } from "src/models/Users.model";
import { UsersService } from "src/services/Users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll(): Promise<Users[]> {
        return this.usersService.getAll();
    }

    @Get('user/:slug')
    getBySlug(@Param('slug') slug: string): Promise<Users> {
        return this.usersService.getBySlug(slug);
    }

    @Post('create')
    create(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.create(createUsersDto)
    }

    @Post('update')
    update(@Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(updateUsersDto)
    }

    @Delete('delete/:slug')
    delete(@Param('slug') slug: string) {
        return this.usersService.delete(slug)
    }
}