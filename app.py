from flask import Flask, render_template
from decouple import config

app = Flask(__name__)


@app.route('/')
def index():
    return render_template(
        'index.html',
        host_api=config('HOST_API')
    )


if __name__ == '__main__':
    app.run(
        host=config('HOST', default='localhost'),
        port=config('PORT', default=9000, cast=int),
        debug=config('DEBUG', default=False, cast=bool),
    )
