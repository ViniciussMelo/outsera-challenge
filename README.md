<div align="center">
  <h1>Cart Microservice</h1>
</div>
<div>
  <strong>This project is using nodejs + typescript.</strong>
</div>

<div align="center">
  <sub>Built by
  <a href="https://www.linkedin.com/in/vinicius-spada-melo/">Vinicius Spada Melo</a>
</div>

## Requirements
The application can be run locally or in a docker container, the requirements for each setup are listed below.

> - **Node** with version equal or higher than 18 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** with version equal or higher than 9 - [Npm Download](https://www.npmjs.com/package/download)
> - **Git** with version equal or higher than 2.25.1 - [Git Donwload](https://git-scm.com/downloads)

## Installation
> Clone this project in your computer with the command:
> ```
> 	git clone https://github.com/ViniciussMelo/outsera-challenge.git
> ```
> Install the dependencies with the following command:
> ```
> npm install
> ```

## Running
> Before you run the application, you need to create a ```.env``` file and provide the environment values, by copying the ```.env.example``` and provide the values.
> We are using prisma, that we need to generate prisma models with:
>
> ```
> npx prisma generate
> ```
> After that we need to push/create the database tables
>
> ```
> npx prisma db push
> ```
> Now you can run the application using the command
>
> ```
> npm run dev
> ```

## Tests
> You can run the tests with the following command
>
> ```
>  npm run test
> ```

## Improvements
- Add unit tests;
- Add more endpoints to be able to create more movies and update the table;
- Replace the in-memory database with a persistent solution, such as PostgreSQL or MySQL, ensuring better data durability, scalability, and reliability.