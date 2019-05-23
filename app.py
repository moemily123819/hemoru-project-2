from company_info import get_profiles_info
from company_info import get_company_info
import os

from flask import Flask, jsonify, render_template, redirect
from flask_pymongo import PyMongo

# Create an instance of Flask
#app = Flask(__name__,
#            static_url_path='',#
#           static_folder='static')

app = Flask(__name__)

MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/project_2_app";


app.config['MONGO_URI'] = MONGO_URL
mongo = PyMongo(app)


# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/project_2_app")



# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    profiles_list = mongo.db.profiles.find_one()
    
    if (profiles_list is None):
        profiles_list = get_profiles_info()
        for profile in profiles_list:
            print(profile)
        mongo.db.profiles.insert_many([profiles_list])
    
    
    
    # Return template and data
    return render_template("index.html")

@app.route("/comp_profiles")
def comp_profiles():

       
    # Return template and data
    return render_template("comp_profiles.html")


@app.route("/monthly")
def elements():

    # Return template and data
    return render_template("monthly.html")


@app.route("/chart")
def chart():

    # Return template and data
    return render_template("chart.html")


#@app.route("/return")
#def return():

    # Return template and data
#    return redirect("/", code=302)


@app.route("/profiles")
def profiles():
#    """Return a list of tickers"""
    profiles_list = list(mongo.db.profiles.find())

#    profiles_list = get_profiles_info()
#    print('profile_list', profiles_list)
    prof_list = {
        "ticker": profiles_list[0]["ticker"],
        "comp_name": profiles_list[0]["comp_name"],
        "comp_desc" : profiles_list[0]["comp_name"],
        "industry" : profiles_list[0]["zacks_x_ind_code"],
        "ind_desc" : profiles_list[0]["zacks_x_ind_desc"],
        "sector" : profiles_list[0]["zacks_x_sector_code"],
        "sector_desc" : profiles_list[0]["zacks_x_sector_desc"],
        "comp_url" : profiles_list[0]["comp_url"],
        "address" :  profiles_list[0]["address_line_1"],
        "city" :  profiles_list[0]["city"],
        "email" :  profiles_list[0]["email"],
        "phone" :  profiles_list[0]["phone_nbr"],
        "state" :  profiles_list[0]["state_code"],
        "market_val" : profiles_list[0]["market_val"],
        "total_rev" : profiles_list[0]["tot_revenue_f0"],
        "net_income" : profiles_list[0]["net_income_f0"],
        "pe_ratio" : profiles_list[0]["pe_ratio_f1"],
        "div_yield" : profiles_list[0]["div_yield"],
        "strong_buys" : profiles_list[0]["rating_strong_buys"],
        "strong_sells" : profiles_list[0]["rating_strong_sells"],
        "rating_buys" : profiles_list[0]["rating_buys"],
        "rating_sells" : profiles_list[0]["rating_sells"],
        "rating_holds" : profiles_list[0]["rating_holds"]
    }
    return jsonify(prof_list)
#

@app.route("/company/<ticker>")
def company(ticker):
#    """Return a company's profile"""

    company = get_company_info(ticker)

    return company



#@app.route("/monthly_data/<dates>/<diff>")
#def monthly_data(dates, diff):
    
##    """Return the current ticker"""
#    for d in range(len(dates)):
#        m_diff = {"name" : dates[d],
#                 "data" : diff[d]
#                 }
#        monthly_diff.append(m_diff)
#    
#    return jsonify(monthly_diff)





if __name__ == "__main__":
    app.run(debug=True)
