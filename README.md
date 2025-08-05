
# 📝 Full Stack Todo App

This is a full-stack To-Do application.It allows users to add, update, and delete tasks with status tracking. The app also supports authentication, validation, and full deployment using free services.


## Features

- ✅ Add / Edit / Delete To-Dos
- ✅ Task status: `Completed` / `Pending`
- ✅ RESTful APIs using Express.js
- ✅ MongoDB Atlas for database
- ✅ API validation & basic error handling
- ✅ JWT-based login & signup

## 🛠️ Technologies Used

| Layer     | Tech Stack                        |
|-----------|-----------------------------------|
| Frontend  | React, Tailwind CSS, Axios        |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB (via MongoDB Atlas)       |
| Auth      | JSON web tokens (JWT)                               |

## 🔗 Live Links


- 🌐 Frontend: -------
- 🛠️ Backend API: ------

## 🧪 Setup Instructions (Run Locally)

### 1. Clone the Repository

```bash
git clone https://github.com/Aayushisherenow/Todo-App.git
cd Todo-App

```
### 2. Setup Backend 

```bash
cd backend
cp .env.example .env 
npm install
npm start 

```
## 3.Setup Frontend

```bash
cd frontend
cp .env.example .env 
npm install
npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in backend.

`PORT`

`DB_NAME`

`MONGODB_URI`

`JWT_SECRET_KEY`

To run this project, you will need to add the following environment variables to your .env file in frontend.

`PORT`

## API Reference
### REST API For User Authentication
#### For user registration

```bash
  POST /api/users/register
```

| Parameter | Type     |   Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**.Must be unique and atleast 6 characters long. |
| `email` | `email` |**Required**. |
| `password` | `string` |**Required**.Password must be at least 8 characters long and contain at least one letter and one number| 



#### For user login
---
```bash
  POST /api/users/login/
```

| Parameter | Type     |   Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**.Must be unique and atleast 6 characters long. |
| `password` | `string` |**Required**.Password must be at least 8 characters long and contain at least one letter and one number| 

### REST API For Todos

#### To create todo
---
```bash
  POST /api/todos/add
```

| Parameter | Type     |   Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**. |
| `description` | `string` |**Required**.| 
| `status` | `boolean` |**DEFAULT**.False | 



#### To get todos

```bash
  GET /api/todos/getAll/{id}
```

#### To edit todos
---
```bash
  PUT /api/todos/update/{id}
```

| Parameter | Type     |   Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **OPTIONAL**. |
| `description` | `string` |**OPTIONAL**.| 
| `status` | `boolean` |**OPTIONAL**. |

Atleast one of the **OPTIONAL** must be changed.

---
#### To delete todos

```bash
  DELETE /api/todos/delete/{id}
```







## 📚 Notes & Assumptions
-Only authenticated users can manage their todos

-Status of each todo defaults to in progress but can be updated

-Deployed apps are fully functional and tested


## Authors

- [@Aayush Poudel](https://www.github.com/Aayushisherenow)

