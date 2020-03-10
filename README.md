# Библиотека книг

Прописываем глобальную переменную для создания окружения в проекте:
> export PIPENV_VENV_IN_PROJECT=1

Coбрать окружения командами:

> pipenv install

> npm i

В папке с проектом:

> pipenv shell

Выполнить миграции в базу данных:

> python manage.py makemigrations

> python manage.py migrate


Запуск сервера:

> python manage.py runserver

Сборка клиента:

> npm run build