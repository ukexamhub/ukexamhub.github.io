
$(document).ready(function(){

      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        daysOfWeekDisabled: "0, 6",
        // endDate: "today"
    });
  

  var proxy = "https://cors-anywhere.herokuapp.com/";
  //var proxy = "";
  
  $(document).ajaxStart(function(){
    $(".modal").css("display", "block");
  });
  // $(document).ajaxComplete(function(){
  //     $(".modal").css("display", "none");
  // });
  $(document).ajaxStop(function () {
    $(".modal").css("display", "none");// 0 === $.active
});
 
  

  $.getJSON("exchange.json", function(json) {
    for(var i =0; i<json.length; i++){
      $("#exchange").append('<option value='+json[i].CODE+'>'+json[i].CODE+'-'+json[i].NAME+'</option>');
      $('.selectpicker').selectpicker('refresh');
    }

    
    var options = {
      url: "files/"+$("#exchange").val()+".json",
    
      getValue: "Name",
    
      list: {
        match: {
          enabled: true
        },
        
          onSelectItemEvent: function() {
                var value = $("#provider-json").getSelectedItemData().Code; //get the id associated with the selected value
                $("#company").val(value); //copy it to the hidden field
          }
        }
      }
      $("#provider-json").easyAutocomplete(options);

  
    // for(var i =0; i<json.length; i++){
    //   $("#exchange").append('<option value='+json[i].CODE+'>'+json[i].CODE+'-'+json[i].NAME+'</option>');
    //   $('.selectpicker').selectpicker('refresh');
    // }

    // $.getJSON("files/"+json[0].CODE+".json", function(data){
    //   for(var i =0; i<data.length; i++){
    //     $("#company").append('<option value='+data[i].Code+'>'+data[i].Name+'('+data[i].Country+')</option>');
    //   }
    //   $('.selectpicker').selectpicker('refresh');
    // });
    
    //   $.get("https://eodhistoricaldata.com/api/exchanges/"+json[0].CODE+"?api_token=5b0e43f3434df9.84460039&fmt=json", function(data){
    //   for(var i =0; i<data.length; i++){
    //     $("#company").append('<option value='+data[i].Code+'>'+data[i].Name+'('+data[i].Country+')</option>');
        
    //   }
    //   $('.selectpicker').selectpicker('refresh');
  
    // });
    
});



$("#exchange").change(function(){
  //$(".modal").css("display", "block");
// if($("#exchange").val()!="US"){
//   $("#provider-json").hide();
//   $(".comp").selectpicker('show');
//   $('#exchange').selectpicker('refresh');
//   $.getJSON("exchange.json", function(d){
//     var i =0;
//     for(i=0; i<d.length; i++){
//       if(d[i].CODE === $("#exchange").val()) break;
//     }
//     console.log(d[i].CURRENCY);
//     $(".currency").text(d[i].CURRENCY);
//   });

//   var exchangeCode = $(this).val();
//    console.log(exchangeCode);

//   $.getJSON("files/"+exchangeCode+".json", function(data){
//     $("#company").empty();
   
//     for(var i =0; i<data.length; i++){
//       //console.log(data[i].Code);
//       $("#company").append('<option value='+data[i].Code+'>'+data[i].Name+'('+data[i].Country+')</option>');
     
//     }
//     $('#company').selectpicker('refresh');
//   });
  // var comp = "https://eodhistoricaldata.com/api/exchanges/"+exchangeCode+"?api_token=5b0e43f3434df9.84460039&fmt=json";
  // $.get(comp, function(data){
  //   $("#company").empty();
   
  //   for(var i =0; i<data.length; i++){
  //     //console.log(data[i].Code);
  //     $("#company").append('<option value='+data[i].Code+'>'+data[i].Name+'('+data[i].Country+')</option>');
     
  //   }
   
  // });
//}

  
  var options = {
    url: "files/"+$("#exchange").val()+".json",
  
    getValue: "Name",
  
    list: {
      match: {
        enabled: true
      },
      
        onSelectItemEvent: function() {
              var value = $("#provider-json").getSelectedItemData().Code; //get the id associated with the selected value
              $("#company").val(value); //copy it to the hidden field
        }
      }
    }
  
  
  $("#provider-json").easyAutocomplete(options);
  $.getJSON("exchange.json", function(d){
    var i =0;
    for(i=0; i<d.length; i++){
      if(d[i].CODE === $("#exchange").val()) break;
    }
    console.log(d[i].CURRENCY);
    $(".currency").text(d[i].CURRENCY);
  });

});







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

    

    $('#exchange').selectpicker('refresh');
    
    var com = $("#company").val();
    
    var exc = $("#exchange").val();
    console.log(exc, com);
    $.getJSON("exchange.json", function(d){
      var i =0;
      for(i=0; i<d.length; i++){
        if(d[i].CODE === $("#exchange").val()) break;
      }
      console.log(d[i].CURRENCY);
      $(".currency").text(d[i].CURRENCY);
    });
    var amount = $("#amount").val();
    var date = $("#date").val();
    
    //var jsonURL = "https://eodhistoricaldata.com/api/eod/AAPL.US?from="+date+"&to="+next+"&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=d&fmt=json";
    var curDate = proxy + "https://eodhistoricaldata.com/api/real-time/"+com+"."+exc+"?api_token=5b0e43f3434df9.84460039 &fmt=json&filter=close";
    var split = proxy + "https://eodhistoricaldata.com/api/splits/"+com+"."+exc+"?api_token=5b0e43f3434df9.84460039 &from="+date+"&fmt=json";
    var div = proxy + "https://eodhistoricaldata.com/api/div/"+com+"."+exc+"?api_token=5b0e43f3434df9.84460039 &from="+date+"&fmt=json";
    var dividend = 0;

    $.get(curDate, function(data){
        $("#cur").val(data);
    });    
    

        var currentVal = 0;
        var volume = 0 ;
        var next = incr_date(date); 
        var his = proxy+ "https://eodhistoricaldata.com/api/eod/"+com+"."+exc+"?from="+date+"&to="+next+"&api_token=5b0e43f3434df9.84460039&period=d&fmt=json";
        $.get(curDate, function(data){
          currentVal = data;
                                               console.log(currentVal);
          
          $.get(his, function(data){
            if(data.length == 0) alert("Data unavailable");
            else{
              volume = amount/(data[0].close);
            
                                                console.log(volume);
            
            $.get(split, function(data){
              if(data.length!=0){
                  for(var i in data){
                    volume*=parseInt(data[i].split);                
                  }
            }
                                                console.log(volume);
              
             
              //volume=Math.floor(volume);
              currentVal=currentVal*volume;
              currentVal = Math.floor(currentVal);
               $("#current").val(currentVal);
            });
          
          }
          });
        });
    

    
    
  });
});