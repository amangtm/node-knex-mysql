# Persistance using MYSQL database, Knex and Node server

## Steps
1. `npm init`
2.  `npm i nodemon` [used as dev-dependency]
3. `npm i express knex mysql` [`knex` SQL quiery builder for `mysql` database]
4.  `npm i cors` [preventing CORS errors from client side]

## API 
- Get `todo`  task data at [link](http://127.0.0.1:5002/api/tasks/todo)
- Get `done`  task data at [link](http://127.0.0.1:5002/api/tasks/done)

- Post task data at [link](http://127.0.0.1:5002/api/tasks/TASK_TYPE)  { where TASK_TYPE= `todo` OR `done`}
- Update task data at [link](http://127.0.0.1:5002/api/tasks/TASK_TYPE/id) 
- Post task data at [link](http://127.0.0.1:5002/api/tasks/TASK_TYPE/id) 

