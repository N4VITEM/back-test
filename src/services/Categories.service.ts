import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import slugify from "slugify";
import { CreateCategoriesDto, UpdateCategoriesDto } from "src/DTO/Categories.dto";
import { Categories } from "src/models/Categories.model";

@Injectable()
export class CategoriesService {
    constructor(private sequelize: Sequelize) { }

    async getAll(): Promise<Categories[]> {
        const [rows] = await this.sequelize.query<Categories[]>('SELECT * FROM "Categories"', {
            type: QueryTypes.SELECT
        });
        return rows;
    }

    async getBySlug(slug: string): Promise<Categories> {
        const [row] = await this.sequelize.query<Categories[]>(`SELECT * FROM "Categories" WHERE slug = :slug`, {
            type: QueryTypes.SELECT,
            replacements: { slug }
        });
        return row[0];
    }

    async create(createCategoriesDto: CreateCategoriesDto): Promise<void> {
        const slug = slugify(createCategoriesDto.category, { lower: true });

        
        try {
            await this.sequelize.query(`
                INSERT INTO "Categories" ("category", "slug", ${createCategoriesDto.parentSlug ? '"parentSlug",': ''} "createdAt", "updatedAt")
                VALUES (:category, :slug, ${createCategoriesDto.parentSlug ? `'` + createCategoriesDto.parentSlug + `',` : ''} NOW(), NOW())`, {
                type: QueryTypes.INSERT,
                replacements: {
                    category: createCategoriesDto.category,
                    slug
                }
            });
        } catch(err) {
            console.log(err)
        }
    }

    async update(updateCategoriesDto: UpdateCategoriesDto): Promise<void> {
        const newSlug = slugify(updateCategoriesDto.category, { lower: true });
        const parentSlug = updateCategoriesDto.parentSlug ? updateCategoriesDto.parentSlug : null;

        await this.sequelize.query(`
            UPDATE "Categories"
            SET "category" = :category, "slug" = :newSlug, "parentSlug" = :parentSlug, "updatedAt" = NOW()
            WHERE "slug" = :slug`, {
            type: QueryTypes.UPDATE,
            replacements: {
                category: updateCategoriesDto.category,
                newSlug,
                parentSlug,
                slug: updateCategoriesDto.slug
            }
        });
    }

    async delete(slug: string): Promise<void> {
        await this.sequelize.query(`
            DELETE FROM "Categories"
            WHERE "slug" = :slug`, {
            type: QueryTypes.DELETE,
            replacements: { slug }
        });
    }
}
