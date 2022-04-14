# 2110-06

## **Инструкция по локальному запуску:

0. Должен быть установлен интерпретатор CPython 3.10.1 и менеджер пакетов pip
1. Склонировать репозиторий
2. Создать виртуальное окружение:

        python -m venv env
3. Активировать виртуальное окружение.

    Для Windows:

        env\Scripts\activate.

    Для UNIX:

        source env/bin/activate
4. Установить переменные окружения.

    Для Windows:

        set DB_URL=postgresql://<username>:<password>@<ip>:<port>/<database>
        set ENV=PROD/DEBUG

    Для UNIX:

        export DB_URL=postgresql://<username>:<password>@<ip>:<port>/<database>
        export ENV=PROD/DEBUG
5. Перейти в корень проекта
6. Установить зависимости pip install -r requirements.txt
7. Запустить веб сервер командой

        uvicorn app:app
8. В браузере перейти по http://localhost:8000/docs - страница с автоматической документацией к API