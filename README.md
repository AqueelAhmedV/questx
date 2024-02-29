
# Questx App (Netropolis Hackathon Submission)

## Stack

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Django](https://www.djangoproject.com/) - Django makes it easier to build better web apps more quickly and with less code.
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types.

## Project structure

```
$PROJECT_ROOT
│   
├── web # backend file
│   
├── frontend # React files
│   
├── web/templates # Django Templates
│   
├── web/static-dev # Django Static Files
```
---

### Hosted Website

- Website Hosted on [this link](https://questx.onrender.com/)
- Can have lag upto 1 minute as it is hosted on free tier
- Credentials For User and Community Manager Auto-Filled for convenience


#### For Backend

- Clone Repo

- Create Virtual Environment for Python

```
python -m virtualenv venv
```

- Activate Virtual Environment (powershell)

```
.\venv\Scripts\activate.ps1
```
**_NOTE:_** `Set-ExecutionPolicy Unrestricted -Scope CurrentUser`

- Install Dependencies

```
pip install -r requirements.txt
```

> **_NOTE:_**     To Install Latest Dependencies run command <br/>
> ``
> pip install -r required.txt
> ``

- Install Dependencies (For Poetry)

```
poetry install
```

- Setup Backend Environment Variables

Download the `.env` file from [this link](https://drive.google.com/file/d/1qP4zfaSQKpI4aIJVJ83dMQrdrdKaOWW0/view?usp=sharing) and Paste the `.env` file inside `web/` 

- Make Migrations

```
cd web
python manage.py makemigrations
python manage.py migrate --run-syncdb
```
- Run Server

```
python manage.py runserver
```

####  For Frontend

- Install Dependencies

```
cd frontend/
yarn install
```
- Run Vite

```
yarn dev
```
<br/>


> **_NOTE:_**     To Use Django & React in With hot reload in Django Templates Run: <br/>
> ``` 
> cd web/
> python manage.py runserver
> ```
> and 
> ```
> cd frontend/
> yarn dev
> ``` 

