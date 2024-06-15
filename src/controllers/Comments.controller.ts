import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateCommentsDto, UpdateCommentsDto } from "src/DTO/Comments.dto";
import { Comments } from "src/models/Comments.model";
import { CommentsService } from "src/services/Comments.service";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    getAll(): Promise<Comments[]> {
        return this.commentsService.getAll();
    }

    @Get('comment/:id')
    getById(@Param('id') id: number): Promise<Comments> {
        return this.commentsService.getById(id);
    }

    @Post('create')
    create(@Body() createCommentsDto: CreateCommentsDto) {
        return this.commentsService.create(createCommentsDto)
    }

    @Post('update/:id')
    update(@Body() updateCommentsDto: UpdateCommentsDto, @Param('id') id: number) {
        return this.commentsService.update(updateCommentsDto, id)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.commentsService.delete(id)
    }
}