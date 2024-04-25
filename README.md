### Commandos para build em docker:
`cp .env.example .env`

`docker compose up --build`

### Seeds - Se quiser povoar o banco com dados de teste:
`docker compose exec api npm run seed:run`
