import pymongo
import os
from flask_pymongo import PyMongo

MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/project_2_app";


app.config['MONGO_URI'] = MONGO_URL
mongo = PyMongo(app)

#client = pymongo.MongoClient(conn)


# if database project_2_db exists, nothing will be done
# if not exist, get_profiles_info() will retrieve from quandl - zack company profiles API

dblist = mongo.list_database_names()
if "project_2_app" in dblist:
    print("The database exists.")
else:
    db = mongo.project_2_app

