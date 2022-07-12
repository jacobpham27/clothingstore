import datetime
import uuid
from datetime import datetime
# from google.cloud import firestore
# from firebase_admin import credentials
# from firebase_admin import firestore
# from google.appengine.ext import db
from google.cloud import datastore
# from google.appengine.api import users
# from google.appengine.ext.db import stats
# import google
from flask import Flask, render_template

app = Flask(__name__)
datastore_client = datastore.Client()

# class item(db.Model):
#     category = db.StringProperty()
#     description = db.StringProperty()
#     gender = db.StringProperty()
#     id = db.StringProperty()
#     name = db.StringProperty()
#     price = db.IntegerProperty()
#     published = db.BooleanProperty()
#     soldOut = db.BooleanProperty()
#     
# class advertisement(db.Model):
#     description = db.StringProperty()
#     id = db.StringProperty()
#     link = db.StringProperty()
#     published = db.BooleanProperty()

# R1 #

@app.route('/')
def root():
    query = datastore_client.query(kind='advertisement')
    results = list(query.fetch())
    print(results)
    return render_template('index.html', results=results)

# ITEMS/FILTER
@app.route('/items/<category>')
def i_c(category):
    query = datastore_client.query(kind='item')
    query.add_filter('category', '=', category)
    results = list(query.fetch())
    print(results)
    return render_template('detail.html', results=results, title=category)

# ITEM INFO
@app.route('/item/<id>')
def i_i(id):
    query = datastore_client.query(kind='item')
    query.add_filter('id', '=', id)
    results = list(query.fetch())
    print(results)
    return render_template('item_detail.html', result=results[0])
    
@app.route('/item/description/<id>')
def i_d_i(id):
    query = datastore_client.query(kind='item')
    query.add_filter('id', '=', id)
    results = list(query.fetch())
    print(results)
    return render_template('item_description.html', result=results[0])

## R2 ##

# ITEM IMAGES/ALTERNATIVE ITEM DISPLAY
# @app.route('/')

# SHOPPING CART
@app.route('/cart')
def cart():
    return 'Shopping cart coming soon.'

# ORDER STATUS
@app.route('/order')
def order():
    return 'Order Status coming soon'

### Runs project on 127.0.0.1:8080 when running locally ###
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
