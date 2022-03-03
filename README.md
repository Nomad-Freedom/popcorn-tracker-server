# Popcorn Tracker (Backend)

<!-- ![sticky notes app](https://raw.githubusercontent.com/Nomad-Freedom/sticky-notes-web/main/public/sticky-notes.png) -->

#### Top Technologies

[![Nodejs Badge](https://img.shields.io/badge/-Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)](#) [![Typescript Badge](https://img.shields.io/badge/-Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)](#) [![Nest Badge](https://img.shields.io/badge/-Nest-E0234E?style=for-the-badge&labelColor=black&logo=nestjs&logoColor=E0234E)](#) [![Postgres Badge](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&labelColor=black&logo=postgresql&logoColor=4169E1)](#)

Popcorn tracker is a full-stack movie tracking application that allows
users to search movies and save them as watched or want to watch. The
front-end was built using Typescript, React, Material UI. The back-end
was built using Node, Nest.js, Typescript, and Postgres.

## Installation

1. Install Postgres [database](https://www.postgresql.org/)
2. Download repository
   ```bash
   git clone https://github.com/Nomad-Freedom/popcorn-tracker-server.git
   ```
3. Install packages

   ```bash
   npm install
   ```

<!-- 4. Install the [frontend](https://github.com/Nomad-Freedom/sticky-notes-web) companion to this backend -->

## Run in Development

1. add env.stage.dev file in root directory
   ```env
    TMDB_URL_SEARCH_MOVIES=https://api.themoviedb.org/3/search/movie
    TMDB_URL_MOVIE=https://api.themoviedb.org/3/movie/
    TMDB_API_KEY=<<tmdb-api-key>>
    TMDB_URL_IMAGES=https://image.tmdb.org/t/p/original
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=<<username>>
    DB_PASSWORD=<<password>>
    DB_DATABASE=<<database name>>
   ```
2. run application
   ```bash
   npm run start:dev
   ```

<!-- TODO: Add last video link -->

#### :mailbox: Reach out to me!

- :paperclip: [My Resume/CV]()
- :email: inquiry@bennyhernandez.com
- :url: [bennyhernandez.com](https://www.bennyhernandez.com)
