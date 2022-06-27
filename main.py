import datetime

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def root():
# display advertisements from database
# maybe add featured field to item to display on root
# prices are stored without decimals, ex 13.99 -> 1399 in database
    return render_template('index.html', times=dummy_times)
# cart()
# items()

@app.route('/cart')
def cart():
    return 'Shopping cart coming soon.'

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [START gae_python37_render_template]
