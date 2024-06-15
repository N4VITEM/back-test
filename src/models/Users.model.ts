import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Posts } from "./Posts.model";
import { Comments } from "./Comments.model";

@Table
export class Users extends Model<Users> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    slug: string;

    @HasMany(() => Posts, {
        foreignKey: 'userSlug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Posts[];

    @HasMany(() => Comments, {
        foreignKey: 'userSlug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comments[];
}
