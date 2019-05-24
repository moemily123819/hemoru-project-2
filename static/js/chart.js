var ticker= localStorage.getItem("ticker");
var company_name= localStorage.getItem("company_name");
var date= localStorage.getItem("today_date");
var tickers = [];
var tickers_str = localStorage.getItem("tickers_array");

tickers = tickers_str.split(',');

console.log('tickers_array', tickers);

tickers.forEach((a) => { console.log(a);});

console.log('current ticker :', ticker);

d3.select("#report-date").text(date);

var company_line = d3.select("#company");
company_line.text(ticker + " " + company_name);
    

// Variable for S&P 500 Index ETF for stock comparison
var spy = "SPY";


// initialize empty arrays to store API data
var metadata = [];
var dates = [];
var dateLabels = [];
var closingPrices = [];


var stock_dates = [];
var stock_details = [];

// Variable for url to call API

var spy_url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${spy}&outputsize=full&apikey=${api_key}`;

console.log('spy_url : ', spy_url);  
// Function that activates on load of the page (jQuery syntax)
$(document).ready(function() {

   // Get json data
   d3.json(spy_url).then(function(data) {

      // Separate json object and push values to metadata array
      Object.entries(data).forEach(([key, value]) => {
         metadata.push(value);
      });

      // Isolate dates from metadata index 1 and push values to dates array
      Object.entries(metadata[1]).forEach(([key, value]) => {
         dates.push(value);
         dateLabels.push(key);
      });
      // Slice dates and dateLabels array for 1 year of data
      // Stock market open for 252 days in a year
      stock_dates = dateLabels.slice(0,756);
      dates = dates.slice(0,252);
      dateLabels = dateLabels.slice(0,252);
      // Loop through dates array
      for (i = 0; i < dates.length; i++) {
         
         // Create a closingPrice variable for each closing price
         var closingPrice = parseFloat(dates[i]["4. close"]);
         
         // Push to closingPrices array
         // API stores prices as strings, so parseFloat must be used to convert them to floats
         closingPrices.push(closingPrice);
      }

      // Call getNewSeries function, which includes initial drawing of chart
      getNewSeries(ticker);
   }); 
});
  
// function to draw Chart and add a new series on button click
function getNewSeries(ticker) {

   // Initialize empty array variables to new stock data
   var newMeta = [];
   var newDates = [];
   var newClosingPrices = [];

   // Set url for API call with the new ticker
   var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${api_key}`;

    console.log('2nd url : ', url);  

   // Get json data
   d3.json(url).then(function(data) {

      // Separate json object and push values to newMeta array
      Object.entries(data).forEach(([key, value]) => {
         newMeta.push(value);
      });
      console.log('newMeta from getNewSeries : ', newMeta);  

      // Separate json object and push values to newDates array
      Object.entries(newMeta[1]).forEach(([key, value]) => {
         newDates.push(value);
      });  
      
      // Slice newDates array for 1 year of data
      // Stock market open for 252 days in a year
      stock_details = newDates.slice(0,756);
      newDates = newDates.slice(0,252);
      
      // Loop through newDates array
      for (i = 0; i < newDates.length; i++) {
         
         // Set newClosingPrice variable on each loop
         var newClosingPrice = parseFloat(newDates[i]["4. close"]);
         
         // parseFloat each new price and push to newClosingPrices
         newClosingPrices.push(newClosingPrice);
      }

      // API shows most recent price first, so array must be reversed in order to plot
      newClosingPrices = newClosingPrices.reverse();

      // Create options for chart
      var options = {

         // Set title using dateLabels array to show range
         title: {
            text:  `1-Year Rate of Return vs. S&P 500`
         },
   
         // Set xAxis labels to dateLabels array and reverse to match price arrays
         xAxis: {
            
            // Disable labels (Data is daily, so axis would be cluttered. Date will show in tooltip)
            labels: {enabled: true,
                      style: {
                  color: "#313131"
               }
            },
            categories: dateLabels.reverse()
         },
   
         // Set yAxis title and styling
         yAxis: {
            title: {
                text: 'Rate of Return (%)'
            },
            // Use function to format y axis labels as +/- value with % symbol 
            labels: {
               formatter: function () {
                   return (this.value > 0 ? ' + ' : '') + this.value + '%';
               }
           }, 
             // Set width and color of gridlines
            plotLines: [{
               value: 0,
               width: 2,
               color: '#C0C0C0'
            }]
         }, 
    // Adds percent change from initial point into tooltip
           plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        }, 
          // Create tooltip
         tooltip: {
   
        // Format html in tooltip to show ticker (in same color as line), closing price, and % change from the initial point
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            
            // Round percentages to 2 decimal places
            valueDecimals: 2,
            
            // Add $ sign to closing prices
            valuePrefix: '$',
            
            // Show price & percentage on line, show date on bottom of plot
            split: true
         },
   
         // Create Legend
         legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
         },
   
         // Initial series using SPY Index ETF data
         series: [{
               name: spy,
               data: closingPrices.reverse(),
               
               // Disable circle markers to only show line
               marker: {
                  enabled: false
               }
            }]
         }

      // Draws chart based on options and sets as variable
      // EMILY: Feel free to change the html IDs below to match what is in our actual html files
      var chart = $('#container').highcharts(options).highcharts();

      // Function to add new series when button is clicked
      $('#button').click(function () {
         chart.addSeries({
            name: ticker,
            data: newClosingPrices,
            marker: {
               enabled: false
            }
         });
             buildLineChart();
      });
   });



};



function buildLineChart() {

    
    var b_dates=[];
    var b_details=[];
    var b_open=[];
    var b_close=[];
    var b_high=[];
    var b_low=[];
    var b_vol=[];
    var b_div=[];
    
      b_dates = stock_dates;
      b_details = stock_details;
      
      console.log('details : ', b_dates, b_details);
    
      // Loop through newDates array
      for (i = 0; i < b_dates.length; i++) {
         
         // Set details on each loop
         var closingPrice = parseFloat(b_details[i]["4. close"]);
         var openingPrice = parseFloat(b_details[i]["1. open"]);
         var low = parseFloat(b_details[i]["3. low"]);
         var high = parseFloat(b_details[i]["2. high"]);
         var vol = parseFloat(b_details[i]["6. volume"]);
         var dividend = parseFloat(b_details[i]["7. dividend amount"]);
          

          // Push to arrays
          
         b_close.push(closingPrice);
         b_open.push(openingPrice);
         b_high.push(high);
         b_low.push(low);
         b_vol.push(vol);
         b_div.push(dividend);
      }

          // just retrieve the non zero dividend amount....get it to plot as the value of closing price so it appears on the line
         
      var z_div_close =[];
      var z_dates =[];
      var z_div =[];
    
      for (i = 0; i < b_dates.length; i++) {
         
         if (b_div[i] > 0) {
             z_div_close.push(b_close[i]);
             z_dates.push(b_dates[i]);
             z_div.push('dividend:'+ b_div[i]);
             
         }
      }
    

       console.log('z_div:', z_div, z_dates, z_div_close);
//      z_div = b_div.filter(divid => divid > 0);
    
    
   
     var trace1 = {
          type: "scatter",
          mode: "markers",
//          text:z_div,
          x: z_dates,
          y: z_div_close,
          name: "dividend ",
          text: z_div,
          hoverinfo : 'text',
          marker: {
            size : 10,  
            color: "#0000FF"
          }
        };
    // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      x: b_dates,
      high: b_high,
      low: b_low,
      open: b_open,
      close: b_close
    };

    var plot_data = [trace1, trace2];

    var layout = {
      title: `${ticker} closing prices-past 3 years`,
      xaxis: {
        range: [b_dates[755], b_dates[0]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      showlegend: false
    };

    Plotly.newPlot("plot", plot_data, layout);

    
}   


//buildLineChart();



var monthly = d3.select("#monthly");

monthly.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      localStorage.removeItem("ticker");    
      localStorage.removeItem("company_name");
      localStorage.removeItem("tickers_array");
      localStorage.setItem("ticker", ticker);    
      localStorage.setItem("company_name", company_name);
      localStorage.setItem("tickers_array", tickers);
      location.replace("../monthly")
    
      console.log('monthly -click');
   
})


var chart = d3.select("#chart");

chart.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      localStorage.removeItem("ticker");    
      localStorage.removeItem("company_name");
      localStorage.removeItem("tickers_array");
      localStorage.setItem("ticker", ticker);    
      localStorage.setItem("company_name", company_name);
      localStorage.setItem("tickers_array", tickers);
      location.replace("../chart")
      console.log('charts -click');
   
})

var index = d3.select("#index");

index.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      localStorage.clear();
      console.log('home -click');
      location.replace("../")
   
})



var subscribe = d3.select("#subscribe");

subscribe.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      console.log('subscribe -click');
      location.replace("../subscribe")
   
})


