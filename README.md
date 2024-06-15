# Репозиторий для тествого задания Backend

> Сделайте форк этого репозитория и выполняйте задание в нем

## Задание

Необходимо написать API для блога с возможностью авторизоваться (Cookie JWT), создать пост, создать категорию, подкатегорию, получить список всех постов/категорий или удалить один из своих постов/категорий. Посты должны фильтроваться по slug'у категории.
Для каждого поста должна быть задана категория/подкатегория. Sequelize/TypeORM должны использоваться только для синхронизации моделей базы данных, все SELECT'ы, UPDATE'ы, DESTROY'и должны быть написаны вручную. Категории и посты должны вытаскиваться из бд через slug, не через id. Соответственно все slug'и должны быть уникальными.

### В реализации вы должны использовать

- [NestJS](https://nestjs.com/)
- PostgreSQL
- [Sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)/[TypeORM](https://typeorm.io/)



## Выполнено на уровне mvp
- минимальный debug
- базовые функции работают (CRUD)
- авторизация передает jwt токен для дальнейшей контекстной авторизации на фронте, API в данном типе авторизации не защищены JWT Guard, но защита происходит на уровне CORS политик

## Структура хранения данных: 
- Users (one to many) Posts, Users (one to many) Comments
- Post (many to one) Users, Posts (many to one) Categories
- Categories (one to many) Posts, Categories (one to many) Categories[], Categories (one to one) Categories (рекурсивный метод хранения ссылок на ветви категорий и подкатегорий)
- Comments (many to one) Posts, Comments (many to one) Users, Comments (one to many) Comments, Comments (many to one) Comments (рекурсивный метод хранения ссылок на ветви коментариев и ответов)