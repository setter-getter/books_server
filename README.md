После скачивания приложения с репозитория, необходимо собрать локальные окружения с помощью Pipenv и Webpack.
На всякий случай в терминале прописать переменную для местоположения локального окружения:

export PIPENV_VENV_IN_PROJECT=1

Coбрать окружения командами:

pipenv install --python 3.8

npm i

Запустить в виртуальной среде:

pipenv shell

Запустить сервер:

python manage.py runserver

