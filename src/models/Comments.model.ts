import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Users } from "./Users.model";
import { Posts } from "./Posts.model";

@Table
export class Comments extends Model<Comments> {
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    comment: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userSlug: string;

    @BelongsTo(() => Users, {
        foreignKey: 'userSlug',
        targetKey: 'slug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: Users;

    @ForeignKey(() => Posts)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    postSlug: string;

    @BelongsTo(() => Posts, {
        foreignKey: 'postSlug',
        targetKey: 'slug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    post: Posts;

    @ForeignKey(() => Comments)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    parentId: number;

    @BelongsTo(() => Comments, {
        as: 'parent',
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    parent: Comments;

    @HasMany(() => Comments, {
        as: 'children',
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    children: Comments[];
}
