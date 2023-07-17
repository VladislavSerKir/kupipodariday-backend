<div align="center">
<h1>Проект Яндекса: серверная часть сервиса КупиПодариДай</h1>
<a href="https://github.com/VladislavSerKir/kupipodariday-backend">
<img src="https://github.com/VladislavSerKir/kupipodariday-backend/assets/83783362/45bd4ef8-110e-4192-ab94-3f94404cc89c">
</img>
</a>
</div>
<hr>

Сервис КупиПодариДай позволяет скидываться людям на подарки, создавать свои собственные идеи на подарки а так же создавать собственные списки из них.

## Технологии в проекте

Для написания бэкенда сервиса использовался фреймворк Nest.js на основе Node.js. Он позволяет писать намного меньше кода по сравнению с последним, используя классы. 
* Благодаря встроенному компилятору TypeScript Nest.js позволяет типизировать все сущности в приложении, что позволяет на этапе компиляции обнаруживать ошибки.
* Построение приложений на Nest.js базируется на паттерне **Dependency Injection**. Суть которого заключается в подключении небольших модулей (в качестве которых могут выступать группы роутов по одной тематике) в один корневой модуль. Каждый модуль состоит из контроллера, сервиса и репозитория. Благодаря **Dependency Injection** фреймворк позволяет независимо от модуля переиспользовать состовляющие других модулей т.е контроллеры, сервисы и репозитории, что сказывается на скорости работы приложения.
* Для подключения к базе данных используется **pipeline**
* В качестве базы данных использована **Postgres**. Для формирования запросов к базе данных используется встроенный в фреймворк querry parser **TypeORM**
* В зависимости от режима работы приложения, созданы соответствующие файлы окружения **env**.
* Для обширного логгирования ошибок серверного приложения использовался пакет **winston**.
* Реализация входа по токену осуществлена через библиотеку **passport-jwt**.
* Перед отправкой запроса и его обработкой осуществляется проверка содержимого запроса из тела через **DTO**. Так же описаны модели сущностей **Entities** для каждого модуля.
* Сервис включает в себя 4 основных модуля **offer, user, wish, wishlist** и один вспомогательный **auth**.

## Реализация

## Технологии

<div align="left">
  <br/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" title="TypeScript" alt="TypeScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-plain.svg" title="Nest" alt="Nest" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-plain.svg" title="Postgres" alt="Postgres" width="40" height="40"/>&nbsp;
</div>

## Установка, настройка
- Установка зависимостей: `npm install`
- Режим разработки: `npm start:dev`
- Режим production: `npm start:prod`
- Сформировать проект для последующего размещения на ресурсах: `npm build`
## Написать мне
[![github](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github)](https://github.com/VladislavSerKir)
[![telegram](https://img.shields.io/badge/Telegram-68c4f0?style=for-the-badge&logo=telegram)](https://t.me/vl_kireev)


