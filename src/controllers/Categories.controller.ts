import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateCategoriesDto, UpdateCategoriesDto } from "src/DTO/Categories.dto";
import { Categories } from "src/models/Categories.model";
import { CategoriesService } from "src/services/Categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getAll(): Promise<Categories[]> {
        return this.categoriesService.getAll();
    }

    @Get('category/:slug')
    getBySlug(@Param('slug') slug: string): Promise<Categories> {
        return this.categoriesService.getBySlug(slug);
    }

    @Post('create')
    create(@Body() createCategoriesDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoriesDto)
    }

    @Post('update')
    update(@Body() updateCategoriesDto: UpdateCategoriesDto) {
        return this.categoriesService.update(updateCategoriesDto)
    }

    @Delete('delete/:slug')
    delete(@Param('slug') slug: string) {
        return this.categoriesService.delete(slug)
    }
}