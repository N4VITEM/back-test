import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Posts } from "./Posts.model";

@Table
export class Categories extends Model<Categories> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category: string;

    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    slug: string;

    @ForeignKey(() => Categories)
    @AllowNull
    @Column({
        type: DataType.STRING
    })
    parentSlug: string;

    @BelongsTo(() => Categories, {
        foreignKey: 'parentSlug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    parent: Categories;

    @HasMany(() => Categories, {
        foreignKey: 'parentSlug',
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    })
    children: Categories[];

    @HasMany(() => Posts, {
        foreignKey: 'categorySlug',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Posts[];
}
