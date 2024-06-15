import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './configuration/config';
import { UsersModule } from './modules/Users.module';
import { PostsModule } from './modules/Posts.module';
import { CommentsModule } from './modules/Comments.module';
import { CategoriesModule } from './modules/Categories.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/Authentication.controller';
import { UsersService } from './services/Users.service';
import { AuthenticationService } from './services/Authentication.service';
import * as cookieParser from 'cookie-parser'

@Module({
  imports: [
    SequelizeModule.forRoot(config),
    UsersModule,
    PostsModule,
    CommentsModule,
    CategoriesModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthenticationService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cookieParser())
    .forRoutes('*')
  }
}
