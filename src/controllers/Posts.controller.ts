import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatePostsDto, UpdatePostsDto } from "src/DTO/Posts.dto";
import { Posts } from "src/models/Posts.model";
import { PostsService } from "src/services/Posts.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getAll(): Promise<Posts[]> {
        return this.postsService.getAll();
    }

    @Get('post/:slug')
    getBySlug(@Param('slug') slug: string): Promise<Posts> {
        return this.postsService.getBySlug(slug);
    }

    @Post('create')
    create(@Body() createPostsDto: CreatePostsDto) {
        return this.postsService.create(createPostsDto)
    }

    @Post('update')
    update(@Body() updatePostsDto: UpdatePostsDto) {
        return this.postsService.update(updatePostsDto)
    }

    @Delete('delete/:slug')
    delete(@Param('slug') slug: string) {
        return this.postsService.delete(slug)
    }
}