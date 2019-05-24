var date= localStorage.getItem("today_date");

d3.select("#report-date").text(date);

      

var ticker= " ";
var company_name= " ";
var tickers = [];
var comp_name = [];
var comp_url = [];
var comp_desc = [];
var address = [];
var city = [];
var state = [];
var market_val = [];
var industry = [];
var ind_desc = [];
var sector = [];
var sector_desc = [];
var total_rev = [];
var net_income = [];
var pe_ratio = [];
var div_yield = [];
var phone = [];
var email = [];
var strong_buys = [];
var strong_sells = [];
var rating_buys = [];
var rating_sells = [];
var rating_holds = [];

        


var today = new Date();
//var date = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;



function profile_retrieval(ticker) {

      var ind = tickers.indexOf(ticker);
    
      var marketValue = (parseFloat(market_val[ind])/1000).toFixed(2);
      var netIncome = (parseFloat(net_income[ind])/1000).toFixed(2);
      var totalRevenue = (parseFloat(total_rev[ind])/1000).toFixed(2);

      if (!email[ind]) {
          email[ind] = "N/A";
          console.log('N/A');
      }
    
      console.log('ind :', ind);
      document.getElementById("company-name").innerHTML = comp_name[ind];
      company_name=comp_name[ind];
      document.getElementById("company-desc").innerHTML = comp_desc[ind];
      document.getElementById("sector-desc").innerHTML = 'Sector : ' + sector_desc[ind] ;
      document.getElementById("company-website").innerHTML = 'Company website : ' + comp_url[ind];
      document.getElementById("company-addr").innerHTML = 'Headoffice : ' + address[ind] + ', ' + city[ind] + ', ' + state[ind];
      document.getElementById("market-val").innerHTML = 'Market value : ' + marketValue + ' billion USD' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +  '  Total revenue : ' + totalRevenue + ' billion USD' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + ' Net income : ' + netIncome + ' billion USD';
      document.getElementById("phone-nbr").innerHTML = 'Contact info : ' + phone[ind] +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + ' email : ' + email[ind];
      document.getElementById("div-yield").innerHTML = 'Dividend yield : ' + div_yield[ind] + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + ' PE ratio : ' + pe_ratio[ind];
    
    
    
      d3.json(`/company/${ticker}`).then((tickerInfo) =>{
 
          if (tickerInfo['comp_name'][0] == null) {
              console.log('tickerInfo undefined');
          }     

          console.log('tickerInfo', tickerInfo['comp_name']);
          console.log('strong rating', tickerInfo['rating_cnt_strong_buys'][0]);

          if (tickerInfo['rating_cnt_strong_buys'][0] == undefined || tickerInfo['comp_name'][0] == null) {
              var strong_buys_rating = '<strong>Strong buys rating : </strong>' + strong_buys[ind];
              var strong_sells_rating = '<strong>Strong sells rating : </strong>' + strong_sells[ind];
              var buys_rating = '<strong>Buys rating : </strong>' + rating_buys[ind];
              var sells_rating = '<strong>Sells rating : </strong>' + rating_sells[ind];
              var holds_rating = '<strong>Holds rating : </strong>' + rating_holds[ind];
              
              var strong_buys_1m = " ";
              var strong_buys_2m = " ";
              var strong_buys_3m = " ";
              var strong_sells_1m = " ";
              var strong_sells_2m = " ";
              var strong_sells_3m = " ";
              var buys_1m = " ";
              var buys_2m = " ";
              var buys_3m = " ";
              var sells_1m = " ";
              var sells_2m = " ";
              var sells_3m = "";
              var holds_1m = " ";
              var holds_2m = " ";
              var holds_3m = " ";
              var rating_mean = " ";
              var rating_mean_1m = " ";
              var rating_mean_2m = " ";
              var rating_mean_3m = " ";
              console.log('rating......', rating_mean, rating_mean_1m, sells_rating,holds_rating)
          }     
          else {   
              
              strong_buys_rating = '<strong>Strong buys rating : </strong>' + tickerInfo['rating_cnt_strong_buys'][0];
              strong_buys_1m = '** a month ago : ' + tickerInfo['rating_cnt_strong_buys_1m_ago'][0];
              strong_buys_2m = '** two months ago : ' + tickerInfo['rating_cnt_strong_buys_2m_ago'][0];
              strong_buys_3m = '** three months ago : ' + tickerInfo['rating_cnt_strong_buys_3m_ago'][0];
          
              strong_sells_rating = '<strong>Strong sells rating : </strong>' + tickerInfo['rating_cnt_strong_sells'][0];
              strong_sells_1m = '** a month ago : ' + tickerInfo['rating_cnt_strong_sells_1m_ago'][0];
              strong_sells_2m = '** two months ago : ' + tickerInfo['rating_cnt_strong_sells_2m_ago'][0];
              strong_sells_3m = '** three months ago : ' + tickerInfo['rating_cnt_strong_sells_3m_ago'][0];
          
              buys_rating = '<strong>Buys rating : </strong>' + tickerInfo['rating_cnt_buys'][0];
              buys_1m = '** a month ago : ' + tickerInfo['rating_cnt_buys_1m_ago'][0];
              buys_2m = '** two months ago : ' + tickerInfo['rating_cnt_buys_2m_ago'][0];
              buys_3m = '** three months ago : ' + tickerInfo['rating_cnt_buys_3m_ago'][0];
          
              sells_rating = '<strong>Sells rating : </strong>' + tickerInfo['rating_cnt_sells'][0];
              sells_1m = '** a month ago : ' + tickerInfo['rating_cnt_sells_1m_ago'][0];
              sells_2m = '** two months ago : ' + tickerInfo['rating_cnt_sells_2m_ago'][0];
              sells_3m = '** three months ago : ' + tickerInfo['rating_cnt_sells_3m_ago'][0];
          
              rating_mean = '<strong>Rating mean : </strong>' + tickerInfo['rating_mean'][0];
              rating_mean_1m = '** a month ago : ' + tickerInfo['rating_mean_1m_ago'][0];
              rating_mean_2m = '** two months ago : ' + tickerInfo['rating_mean_2m_ago'][0];
              rating_mean_3m = '** three months ago : ' + tickerInfo['rating_mean_3m_ago'][0];
          
          
              holds_rating = '<strong>Holds rating : </strong>' + tickerInfo['rating_cnt_holds'][0];
              holds_1m = '** a month ago : ' + tickerInfo['rating_cnt_holds_1m_ago'][0];
              holds_2m = '** two months ago : ' + tickerInfo['rating_cnt_holds_2m_ago'][0];
              holds_3m = '** three months ago : ' + tickerInfo['rating_cnt_holds_3m_ago'][0];
              console.log('rating......else', rating_mean, rating_mean_1m, sells_rating,holds_rating)

          }    

//          document.querySelector("#ratings").innerHTML = [
//             "<h6>" + strong_buys_rating + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + strong_sells_rating + "</h6> <br>",
//             "<h6>" + strong_buys_1m + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +  strong_sells_1m + "</h6> <br>",
//             "<h6>" + strong_buys_2m + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +  strong_sells_2m + "</h6> <br>",
//             "<h6>" + strong_buys_3m + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +  strong_sells_3m + "</h6> <br>",
//             "<h6>" + buys_rating + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + sells_rating + "</h6> <br>",
//             "<h6>" + buys_1m + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + sells_1m + "<br>" + sells_2m + "<br>" + sells_3m + "</h6> <br>",
//             "<h6>" + holds_rating + "<br>" + holds_1m + "<br>" + holds_2m + "<br>" + holds_3m + "</h6> <hr>",
//             "<h6>" + rating_mean + "<br>" + rating_mean_1m + "<br>" + rating_mean_2m + "<br>" + rating_mean_3m + "</h6>"].join("");

          
          document.querySelector("#ratings-1").innerHTML = [
             "<h6>" + strong_buys_rating + "<br>" +  strong_buys_1m + "<br>" + strong_buys_2m + "<br>" + strong_buys_3m + "</h6> <br>",
             "<h6>" + buys_rating + "<br>" + buys_1m + "<br>" + buys_2m + "<br>" + buys_3m + "</h6> <br>",
             "<h6>" + holds_rating + "<br>" + holds_1m + "<br>" + holds_2m + "<br>" + holds_3m + "</h6>"].join("");
          
          document.querySelector("#ratings-2").innerHTML = [
             "<h6>" + strong_sells_rating + "<br>" + strong_sells_1m + "<br>" + strong_sells_2m + "<br>" + strong_sells_3m + "</h6> <br>",
             "<h6>" + sells_rating + "<br>" + sells_1m + "<br>" + sells_2m + "<br>" + sells_3m + "</h6> <br>",
             "<h6>" + rating_mean + "<br>" + rating_mean_1m + "<br>" + rating_mean_2m + "<br>" + rating_mean_3m + "</h6>"].join("");

          console.log('rating -- ', rating_mean_1m, rating_mean, holds_rating, holds_1m);
          
  });   
}   




function init() {
    
    console.log('beginning')

    var selector = d3.select("#selDataset");

   
    console.log('processing profiles'); 
    d3.json("/profiles").then((p_info) =>{
           console.log('p_info :', p_info);
   
           tickers = p_info.ticker;
           console.log('tickers', tickers); 
           comp_name = p_info.comp_name;
           comp_desc = p_info.comp_desc;
           industry = p_info.industry;
           ind_desc = p_info.ind_desc;
           sector = p_info.sector;
           sector_desc = p_info.sector_desc;
           comp_url = p_info.comp_url;
           address = p_info.address;
           city = p_info.city;
           email = p_info.email;
           phone = p_info.phone;
           state = p_info.state;
           market_val = p_info.market_val;
           total_rev = p_info.total_rev;
           net_income = p_info.net_income;
           pe_ratio = p_info.pe_ratio;
           div_yield = p_info.div_yield;
           strong_buys = p_info.strong_buys;
           strong_sells = p_info.strong_sells;
           rating_buys = p_info.rating_buys;
           rating_sells = p_info.rating_sells;
           rating_holds = p_info.rating_holds;
           console.log('rating_strong_buys', p_info.rating_strong_buys);
           console.log('rating_strong_sells', p_info.rating_strong_sells);

    
          tickers.forEach((ticker) => {
              selector
                .append("option")
                .text(ticker)
                .property("value", ticker);
              });
    
        // Use the first symbol on the list
          ticker = tickers[0];
          profile_retrieval(ticker);
          console.log('firstTicker', ticker);
        
    
    });

}    
                             


function optionChanged(newTicker) {
  // Fetch new data each time a new sample is selected
      ticker = newTicker;
      console.log(newTicker);
      profile_retrieval(newTicker);

    
}

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



init();


//analyst recommendation - data = quandl.get_table("ZACKS/AR", paginate=True)

// company profile - data = quandl.get_table("ZACKS/CP", paginate=True)