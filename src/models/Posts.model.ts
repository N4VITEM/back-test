import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Users } from "./Users.model";
import { Categories } from "./Categories.model";
import { Comments } from "./Comments.model";

@Table
export class Posts extends Model<Posts> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    content: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    slug: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userSlug: string;

    @BelongsTo(() => Users, {
        foreignKey: 'userSlug',
        targetKey: 'slug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: Users;

    @ForeignKey(() => Categories)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categorySlug: string;

    @BelongsTo(() => Categories, {
        foreignKey: 'categorySlug',
        targetKey: 'slug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    category: Categories;

    @HasMany(() => Comments, {
        foreignKey: 'postSlug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comments[];
}
