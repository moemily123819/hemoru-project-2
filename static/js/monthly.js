var ticker= localStorage.getItem("ticker");
var company_name= localStorage.getItem("company_name");
var date= localStorage.getItem("today_date");
var tickers = [];
var tickers_str = localStorage.getItem("tickers_array");

tickers = tickers_str.split(',');

console.log('tickers_array', tickers);

tickers.forEach((a) => { console.log(a);}); 

d3.select("#report-date").text(date);

var company_line = d3.select("#company");
company_line.text(ticker + " " + company_name);
    

var dates_ticker = [];
var mon_diff_ticker = [];


var today = new Date();
//var date = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

var parseTime = d3.timeParse("%Y-%m-%d");
console.log('today', today);

var formatDate = d3.timeFormat("%Y-%m-%d");
var today_f = formatDate(today);
console.log('today_f', today_f);
var formatYYYY = d3.timeFormat("%Y");
var formatMM = d3.timeFormat("%m");
var formatDD = d3.timeFormat("%d");

var yyyy = formatYYYY(today);
var five_yrs_ago= parseInt(yyyy, 10)-5;
var one_yr_ago= parseInt(yyyy, 10)-1;
var mm = formatMM(today);
var dd = formatDD(today);

var start_date = `${five_yrs_ago}-${mm}-${dd}`;
console.log('start date', start_date);
var start_ym = `${five_yrs_ago}-${mm}`;
var one_yr_start_date = `${one_yr_ago}-${mm}-${dd}`;


function unpack_dates(rows) {
    var stock_0={};
    var dates_0 =[];
    var open_0 =[];
    var close_0 =[];
    var low_0 =[];
    var high_0 =[];
    var vol_0 =[];
    Object.entries(rows).forEach(([key, value]) => {
        if (key >= start_date) {
          dates_0.push(key);
            Object.entries(value).forEach(([key_1, value_1]) => {
                switch(key_1) {
                    case('1. open'):
                        open_0.push(value_1);
                        break;
                    case('2. high'):
                        high_0.push(value_1);
                        break;
                    case('3. low'):
                        low_0.push(value_1);
                        break;
                    case('4. close'):
                        close_0.push(value_1);
                        break
                    case('6. volume'):
                        vol_0.push(value_1);
                        break;
                }    
                     
        });
      }
  });
  stock_0={'dates' : dates_0,
           'open' : open_0,
           'high' : high_0,
           'low' : low_0,
           'volume' : vol_0,
           'close' : close_0 };
  return stock_0;  
    
}



function getMonthlyData(symbol) {

  var queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${api_key}`;
  var mon_diff = [];
    
  d3.json(queryUrl).then(function(data) {
    var meta_data = data["Meta Data"];
//    console.log('meta_data', data);  
    var time_series = data["Monthly Adjusted Time Series"];
    var stock_details = unpack_dates(data["Monthly Adjusted Time Series"]);

    var dates = stock_details.dates;  
    var openPrices = stock_details.open;  
    var lowPrices = stock_details.low;  
    var highPrices = stock_details.high;  
    var closingPrices = stock_details.close;  
    var volume = stock_details.volume;  
          
    mon_diff = buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
    //console.log('monthly_diff', monthly_diff);      
    buildCharts(dates, mon_diff);
    
  });
}





function buildCharts(dates, monthly_diff) {

    var r_monthly_diff = monthly_diff.reverse();    
    var three_years = dates.slice(0, 36);
    var r_dates = three_years.reverse();    
 
    console.log('monthly_diff', monthly_diff);
    console.log('monthly_diff - reverse', r_monthly_diff, r_dates);
    
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: `${ticker} Monthly Variance Report (%)`
    },
    xAxis: {
        categories: r_dates
    },
     yAxis:[{
            title: {
                text: 'Variance in %'
            },
            // Use function to format y axis labels as +/- value with % symbol 
            labels: {
               formatter: function () {
                   return (this.value > 0 ? ' + ' : '') + this.value + '%';
               }
           }, 
     }],
     tooltip: {
   
        // Format html in tooltip to show %
         pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}%</b>'
     },
        
    credits: {
        enabled: false
    },
    series: [ { name : ticker,
                data : r_monthly_diff }]
});
    
         
}



function getData_secondTicker(symbol) {

  var queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${api_key}`;
  var mon_diff = [];
    
  d3.json(queryUrl).then(function(data) {
    var meta_data = data["Meta Data"];
//    console.log('meta_data', data);  
    var time_series = data["Monthly Adjusted Time Series"];
    var stock_details = unpack_dates(data["Monthly Adjusted Time Series"]);

    var dates = stock_details.dates;  
    var openPrices = stock_details.open;  
    var lowPrices = stock_details.low;  
    var highPrices = stock_details.high;  
    var closingPrices = stock_details.close;  
    var volume = stock_details.volume;  
          
  for (var i = 0; i < 36; i++) {
      
    var c_prices = parseFloat(closingPrices[i]);  
    var o_prices = parseFloat(openPrices[i]);  

    var diff = c_prices - o_prices;  
    var diff_perc = +(diff*100/o_prices).toFixed(2);

    mon_diff.push(diff_perc);
      
  }

    buildCharts_forTwo(dates, mon_diff_ticker, mon_diff, symbol);
    
  });
}


function buildCharts_forTwo(dates, monthly_diff_1, monthly_diff_2, secondTicker) {

    
        
//    var r_monthly_diff_1 =monthly_diff_1.reverse();
    var r_monthly_diff_2 =monthly_diff_2.reverse();
    var three_years = dates.slice(0, 36);
    var r_dates = three_years.reverse();    
 
    
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: `${ticker} Monthly Variance Report (%)`
    },
    xAxis: {
        categories: r_dates
    },
     yAxis:[{
            title: {
                text: 'Variance in %'
            },
            // Use function to format y axis labels as +/- value with % symbol 
            labels: {
               formatter: function () {
                   return (this.value > 0 ? ' + ' : '') + this.value + '%';
               }
           }, 
     }],
     tooltip: {
   
        // Format html in tooltip to show %
         pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}%</b>'
     },
        
 
    credits: {
        enabled: false
    },
    series: [ { name : ticker,
                data : monthly_diff_1 },
              { name  : secondTicker,
                data : r_monthly_diff_2 }
            
            ]
});
    
         
}

function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
  

  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
    
  var tbody_info = tbody.html(); 
    
  if (tbody_info != ''){
        var all_tr = d3.select("tbody").selectAll("tr").remove();
        var all_td = d3.select("tbody").selectAll("td").remove();
  }  
    
  var mon_diff = [];
  var trow;
  for (var i = 0; i < 36; i++) {
//    console.log('i', i); 
    trow = tbody.append("tr");
    trow.append("td").text(dates[i]);
    trow.append("td").text(openPrices[i]);
    trow.append("td").text(highPrices[i]);
    trow.append("td").text(lowPrices[i]);
    trow.append("td").text(closingPrices[i]);
    trow.append("td").text(volume[i]);
    var c_prices = parseFloat(closingPrices[i]);  
    var o_prices = parseFloat(openPrices[i]);  

    var diff = c_prices - o_prices;  
    var diff_perc = +(diff * 100 / o_prices).toFixed(2);
    
  //  console.log('diff + i', i, diff);
    mon_diff.push(diff_perc);
      
      
  }

  dates_ticker = dates;
  mon_diff_ticker = mon_diff;

  return mon_diff;
    
}






function init() {
    
    console.log('beginning');
    getMonthlyData(ticker);
    buildCharts(dates_ticker, mon_diff_ticker);
    
    var selector = d3.select("#selDataset");
        
    tickers.forEach((ticker_item) => {
        if (ticker_item != ticker) {
            selector
             .append("option")
             .text(ticker_item)
             .property("value", ticker_item);
        }
        
       });
    
        
    

}    
                             



function optionChanged(secondTicker) {
  // Fetch new data each time a new sample is selected
      console.log(secondTicker);
      getData_secondTicker(secondTicker);
    
}



var chart = d3.select("#chart");

chart.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
      console.log('chart executing');
      location.replace("../chart")
    
})

var comp_profiles = d3.select("#comp_profiles");

comp_profiles.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      console.log('comp_profiles executing');
      location.replace("../comp_profiles")
    
})

var index = d3.select("#index");

index.on("click", function() {

  // Prevent the page from refreshing
      d3.event.preventDefault();
 
      localStorage.clear();    
      console.log('index executing');
      location.replace("../")

    
})



init();


//analyst recommendation - data = quandl.get_table("ZACKS/AR", paginate=True)

// company profile - data = quandl.get_table("ZACKS/CP", paginate=True)