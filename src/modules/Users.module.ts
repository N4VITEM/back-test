import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "src/controllers/Users.controller";
import { Users } from "src/models/Users.model";
import { UsersService } from "src/services/Users.service";

@Module({
    imports: [SequelizeModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}