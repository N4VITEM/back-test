export class CreateCategoriesDto {
    category: string;
    parentSlug?: string;
}

export class UpdateCategoriesDto {
    category: string;
    slug: string;
    parentSlug?: string;
}