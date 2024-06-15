export class CreateCommentsDto {
    comment: string;
    userSlug: string;
    postSlug: string;
    parentId?: number;
}
export class UpdateCommentsDto {
    comment: string;
}