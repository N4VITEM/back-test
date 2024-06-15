import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { CreateCommentsDto, UpdateCommentsDto } from "src/DTO/Comments.dto";
import { Comments } from "src/models/Comments.model";

@Injectable()
export class CommentsService {
    constructor(private sequelize: Sequelize) { }

    async getAll(): Promise<Comments[]> {
        const [rows] = await this.sequelize.query<Comments[]>('SELECT * FROM "Comments"', {
            type: QueryTypes.SELECT
        })
        return rows
    }

    async getById(id: number): Promise<Comments> {
        const [row] = await this.sequelize.query<Comments>(`SELECT * FROM "Comments" WHERE id = '${id}'`, {
            type: QueryTypes.SELECT
        })
        return row
    }

    async create(crreateCommentsDto: CreateCommentsDto) {
        await this.sequelize.query(`INSERT INTO "Comments" ("comment", "userSlug", "postSlug", ${crreateCommentsDto.parentId ? `"parentId",` : ''} "createdAt", "updatedAt") VALUES ( '${crreateCommentsDto.comment}', '${crreateCommentsDto.userSlug}', '${crreateCommentsDto.postSlug}', ${crreateCommentsDto.parentId ? '"' + crreateCommentsDto.parentId + '",': ''} NOW(), NOW())`, {
            type: QueryTypes.INSERT
        })
    }

    async update(updateCommentsDto: UpdateCommentsDto, id: number) {
        await this.sequelize.query(`UPDATE "Posts" SET "comment" = '${updateCommentsDto.comment}', "updatedAt" = NOW() WHERE id = '${id}'`, {
            type: QueryTypes.UPDATE
        })
    }

    async delete(id: number) {
        await this.sequelize.query(`DELETE FROM "Comments" WHERE id = '${id}'`, {
            type: QueryTypes.DELETE
        })
    }
}