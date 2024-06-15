import { Injectable } from "@nestjs/common"
import { QueryTypes } from "sequelize"
import { Sequelize } from "sequelize-typescript"
import slugify from "slugify"
import { CreatePostsDto, UpdatePostsDto } from "src/DTO/Posts.dto"
import { Posts } from "src/models/Posts.model"

@Injectable()
export class PostsService {
    constructor(private sequelize: Sequelize) { }

    async getAll(): Promise<Posts[]> {
        const [rows] = await this.sequelize.query<Posts[]>('SELECT * FROM "Posts"', {
            type: QueryTypes.SELECT
        })
        return rows
    }

    async getBySlug(slug: string): Promise<Posts> {
        const [row] = await this.sequelize.query<Posts>(`SELECT * FROM "Posts" WHERE slug = '${slug}'`, {
            type: QueryTypes.SELECT
        })
        return row
    }

    async create(createPostsDto: CreatePostsDto) {
        const slug = slugify(createPostsDto.userSlug + ':' + createPostsDto.categorySlug + ':' + createPostsDto.title, {lower:true})
        await this.sequelize.query(`INSERT INTO "Posts" ("title", "content", "slug", "userSlug", "categorySlug", "createdAt", "updatedAt") VALUES ( '${createPostsDto.title}', '${createPostsDto.content}', '${slug}', '${createPostsDto.userSlug}', '${createPostsDto.categorySlug}', NOW(), NOW())`, {
            type: QueryTypes.INSERT
        })
    }

    async update(updatePostsDto: UpdatePostsDto) {
        const slug = slugify(updatePostsDto.userSlug + ':' + updatePostsDto.categorySlug + ':' + updatePostsDto.title, {lower:true})
        await this.sequelize.query(`UPDATE "Posts" SET title = '${updatePostsDto.title}', content = '${updatePostsDto.content}', slug = '${slug}', "updatedAt" = NOW() WHERE slug = '${updatePostsDto.slug}'`, {
            type: QueryTypes.UPDATE
        })
    }

    async delete(slug: string) {
        await this.sequelize.query(`DELETE FROM "Posts" WHERE slug = '${slug}'`, {
            type: QueryTypes.DELETE
        })
    }
}