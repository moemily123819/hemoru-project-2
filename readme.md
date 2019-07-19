# *Stock Investment for Beginners*

### **Objective :**

Wondering how to navigate the stocks of US markets ?  Which stock has a solid performance in the past ? Are there dividends paid up periodically ?  Was the stock fluctuating that you lose confidence ? Or was it fluctuating that it allows you to buy low and sell high ?  This is an app that will help stock investors to view the past performance of a stock, compare it against the S&P index and compare it against any stock in the selection.

 

### **Authors :**

Eric Ruzzo, Roy Henry and Emily Mo

 

### **About the data :**

Quandl Zacks company profiles are in use in this app.  It is obtained via API. But since the number of companies received are fixed for the time being, the company profiles are stored in MongoDB once it is received by the API.  The algorithm is : if the data exists in MongoDB, then no need for the API. If not, then use API to get the company profiles.  

Alphavantage API for stock daily prices is used. It is retrieved via API into the program.  The data is then used to plot the graphs.  Highcharts are being used. The graph's distinct contrast is pleasing to the eye !

The monthly stock prices from Alphavantage is APIed to do the monthly variance chart using highcharts and the HTML table to show the monthly figures.



### **About the app :**

This app, with multiple webpages,  uses :

- HTML/CSS/Bootstrap,
- MongoDB,
- Quandl API,
- Alphavantage API - for daily stock prices and monthly stock prices,
- javascript, 
- flask app (using python),
- python script to retrieve data for the flask app,
- plot-ly,
- highcharts,
- heroku for deployment and mLab for the Mongo add-on.  



### Deployment :

This app is deployed in heroku.

[https://hemoru-project-2.herokuapp.com](https://hemoru-project-2.herokuapp.com/)