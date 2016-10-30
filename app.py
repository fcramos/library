from flask import Flask, send_file
from decouple import config

app = Flask(__name__)


@app.route('/')
def index():
    return send_file('templates/index.html')


if __name__ == '__main__':
    app.run(
        host=config('HOST', default='localhost'),
        port=config('PORT', default=9000, cast=int),
        debug=config('DEBUG', default=False, cast=bool),
    )
