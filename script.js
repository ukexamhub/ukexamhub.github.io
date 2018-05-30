$(document).ready(function(){
    for(var i =0; i<100; i++){
    $("#exchange").append('<option id='+i+'>'+i+'</option>');
    }



function incr_date(date_str){
  var parts = date_str.split("-");
  var dt = new Date(
    parseInt(parts[0], 10),      // year
    parseInt(parts[1], 10) - 1,  // month (starts with 0)
    parseInt(parts[2], 10)       // date
  );
  dt.setDate(dt.getDate() + 1);
  parts[0] = "" + dt.getFullYear();
  parts[1] = "" + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = "0" + parts[1];
  }
  parts[2] = "" + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = "0" + parts[2];
  }
  return parts.join("-");
}


var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var current = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

  $("#submit").click(function(){
    var amount = $("#amount").val();
    var date = $("#datetimepicker").val();
    
    //var jsonURL = "https://eodhistoricaldata.com/api/eod/AAPL.US?from="+date+"&to="+next+"&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=d&fmt=json";
    var curDate = "https://eodhistoricaldata.com/api/real-time/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&fmt=json&filter=close";
    var split = "https://eodhistoricaldata.com/api/splits/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&from="+date+"&fmt=json";
    var div = "https://eodhistoricaldata.com/api/div/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&from="+date+"&fmt=json";
    var dividend = 0;

    $.get(curDate, function(data){
        $("#cur").val(data);
    });    
    
    function rawVal(amount, date, fn){
        var currentVal = 0;
        var volume = 0 ;
        var next = incr_date(date); 
        var his = "https://eodhistoricaldata.com/api/eod/AAPL.US?from="+date+"&to="+next+"&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=d&fmt=json";
        $.get(curDate, function(data){
          currentVal = data;
          $.get(his, function(data){
            if(data.length == 0) alert("Data unavailable");
            else{
              volume = amount/(data[0].close);
            }
            $.get(split, function(data){
            
              for(var i in data){
                volume*=parseInt(data[i].split);                
              }
              volume=Math.floor(volume);
              fn(currentVal*volume);
            });
            
          });
        });
    }

    rawVal(amount, date, function(data){
      data = Math.floor(data);
      $("#current").val(data);
    });

    
  });
});