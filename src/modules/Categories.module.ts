import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriesController } from "src/controllers/Categories.controller";
import { Categories } from "src/models/Categories.model";
import { CategoriesService } from "src/services/Categories.service";

@Module({
    imports: [SequelizeModule.forFeature([Categories])],
    providers: [CategoriesService],
    controllers: [CategoriesController]
})
export class CategoriesModule {}