import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsController } from "src/controllers/Comments.controller";
import { Comments } from "src/models/Comments.model";
import { CommentsService } from "src/services/Comments.service";

@Module({
    imports: [SequelizeModule.forFeature([Comments])],
    providers: [CommentsService],
    controllers: [CommentsController]
})
export class CommentsModule {}