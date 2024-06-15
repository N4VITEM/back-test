import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import slugify from "slugify";
import { CreateUsersDto, UpdateUsersDto } from "src/DTO/Users.dto";
import { Users } from "src/models/Users.model";

@Injectable()
export class UsersService {
    constructor( private sequelize: Sequelize ) {}

    async getAll(): Promise<Users[]> {
        const [rows] = await this.sequelize.query<Users[]>('SELECT * FROM "Users"', {
            type: QueryTypes.SELECT
        })
        return rows
    }

    async getBySlug(slug: string): Promise<Users> {
        const [row] = await this.sequelize.query<Users>(`SELECT * FROM "Users" WHERE slug = '${slug}'`, {
            type: QueryTypes.SELECT
        })
        return row
    }

    async getByEmail(email: string): Promise<Users> {
        const [row] = await this.sequelize.query<Users>(`SELECT * FROM "Users" WHERE email = '${email}'`, {
            type: QueryTypes.SELECT
        })
        return row
    }

    async create(createUsersDto: CreateUsersDto) {
        await this.sequelize.query(`INSERT INTO "Users" ("username", "email", "password", "slug", "createdAt", "updatedAt") VALUES ( '${createUsersDto.username}', '${createUsersDto.email}', '${createUsersDto.password}', '${slugify(createUsersDto.username, { lower: true })}', NOW(), NOW())`, {
            type: QueryTypes.INSERT
        })
    }

    async update(updateUsersDto: UpdateUsersDto) {
        await this.sequelize.query(`UPDATE "Users" SET username = '${updateUsersDto.username}', email = '${updateUsersDto.email}', password = '${updateUsersDto.password}', slug = '${slugify(updateUsersDto.username, { lower: true })}', "updatedAt" = NOW() WHERE slug = '${updateUsersDto.slug}'`, {
            type: QueryTypes.UPDATE
        })
    }

    async delete(slug: string) {
        await this.sequelize.query(`DELETE FROM "Users" WHERE slug = '${slug}'`, {
            type: QueryTypes.DELETE
        })
    }
}