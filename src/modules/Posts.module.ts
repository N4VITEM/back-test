import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsController } from "src/controllers/Posts.controller";
import { Posts } from "src/models/Posts.model";
import { PostsService } from "src/services/Posts.service";

@Module({
    imports: [SequelizeModule.forFeature([Posts])],
    providers: [PostsService],
    controllers: [PostsController]
})
export class PostsModule {}