//    Demo json  loaded from dropbox 
//    Data = http://codepen.io/nakome/pen/DnEvr.js
//[   
//   {
//      "photo":"image url ",
//      "name":"Jhon",
//      "last":"Smith",
//      "email":"jhony@site.com",
//      "phone":"1-555-222-333",
//      "web":"http://jhonSmith.com"
//   },
//   { 
//      "photo":"image url",
//      "name":"Carla",
//      "last":"Doe",
//      "email":"carladoe@site.com",
//      "phone":"1-333-111-555",
//      "web":"http://carladoe.com"
//   }
// ]


(function(){
  
  'use-strict';
  
  var elem,
      // data-fn
      dataFn = $('[data-fn="contacts"]'),
      dataFn_R = $('[data-fn="report"]'),
      // data-url
      thisUrl = dataFn.data('url'),
      thisUrl_R = dataFn_R.data('url');
  //thisUrl = 'http://localhost:50984/api/mc/1';
  
  if (typeof $.table_of_contacts == 'undefined')
    
    $.table_of_contacts = {};
  
  $.table_of_contacts.get = {
    
    init: function() {
      if(dataFn){
        this.getJson(thisUrl);
      }else{
        dataFn.html('No data found.');
      }
    },
    
    /* = Get data
    ------------------------*/
    getJson: function(url){
      
      var self = this;
      
        // loading data before
      if (dataFn.html() == "")
      dataFn.html('<span class="loading_table">'+
                  'Loading Please Wait ....'+
                  '</span>');
      
      // No ajax cache
      $.ajaxSetup({ cache: false });
      
      // Get json
      $.getJSON(thisUrl,function(data){
        
        // load template
       // var out_html = self.tpl(); 
          var out_html = '<thead>' +
          '<tr>' +
          '<th>ID</th>' +
          '<th>Name</th>' +         
          '<th>Type</th>' +
           '<th>Action</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody >';

        $.each(data,function(i,obj){  
          // load inner template
            out_html += '<tr>' +
           '<td>' + obj.Id + '</td>' +
            '<td>'+obj.Name+'</td>'+
            '<td>' + obj.Type + '</td>';
            out_html += '<td style=""><a onclick="edt(' + obj.Id + ',\''+obj.Name+'\',\''+obj.Type+'\')">Edit</a> | <a onclick="del(' + obj.Id + ')">Delete</a></td>';
           
            out_html +=  '</tr>';
          
        });
        // close tag
        out_html += '</tbody>';
        // render templates
        dataFn.html(out_html);
        //var timeoutID = window.setTimeout($.table_of_contacts.get.getJson, 3000);
        // error 
      }).error(function(j,t,e){ 
        // render error.
        dataFn.html('<span class="error_table">'+
                    'Error = '+e+
                    '</span>');
        
      });
    },
    
    // head table template
    tpl: function(){
      var html = '<thead>'+
          '<tr>'+
          '<th>Photo</th>'+
          '<th>AgentId</th>' +
         // '<th>Last Name</th>'+    
          '<th>StatusTimestamp</th>' +
          '<th>Duration</th>'+
          //'<th>Web</th>'+
          '</tr>'+
          '</thead>'+
          '<tbody >';
      return html;
    },
    // inner template
    tpl_inner: function(obj){
      
      var  html= '<tr>'+
          '<td class="user-photo">'+
          '<img class="user-tumb" src="'+obj.photo+'"/>'+
          '</td>'+
          '<td>' + obj.AgentId + '</td>' +
          //'<td>'+obj.last+'</td>'+
          '<td>' + obj.AgentStatus + '</td>' +
          '<td>' + obj.Duration + '</td>' +
         // '<td>'+
         // '<a href="'+obj.web+'" title="'+
         // obj.name + ' ' + obj.last+'">'+
         // obj.web +
         // '</td>'+
          '</tr>'; 
      return html;

    }
    
  };
 
  $.table_of_contacts.report = {

      init: function () {
          if (dataFn_R) {
              this.getJson(thisUrl_R);
          } else {
              dataFn_R.html('No data found.');
          }
      },

      /* = Get data
      ------------------------*/
      getJson: function (url) {

          var self = this;

          // loading data before
          if (dataFn_R.html() == "")
              dataFn_R.html('<span class="loading_table">' +
                          'Loading Please Wait ....' +
                          '</span>');

          // No ajax cache
          $.ajaxSetup({ cache: false });

          // Get json
          $.getJSON(thisUrl_R, function (data) {

              // load template
              var out_html = '<thead>' +
              '<tr>' +
              '<th>S.NO</th>' +
              '<th>Agent Status</th>' +
              '<th>Count</th>' +
             // '<th>StatusTimestamp</th>' +
              '</tr>' +
              '</thead>' +
              '<tbody >';

              $.each(data, function (i, obj) {
                  // load inner template
                  out_html += '<tr>' +

              '<td>' + obj.AgentRealtimeInfoId + '</td>';
            // '<td>' + obj.AgentId + '</td>';
                  if (obj.AgentStatus == "HOLD ABANDONED")
                      out_html += '<td style="background-color: RED;">' + obj.AgentStatus + '</td>';
                  else if (obj.AgentStatus == "ON HOLD")
                      out_html += '<td style="background-color: YELLOW;">' + obj.AgentStatus + '</td>';
                  else
                      out_html += '<td style="background-color:GREEN;">' + obj.AgentStatus + '</td>';

                  out_html += '<td>' + obj.AgentId + '</td>' +
             // '<td>'+
             // '<a href="'+obj.web+'" title="'+
             // obj.name + ' ' + obj.last+'">'+
             // obj.web +
             // '</td>'+
              '</tr>';

              });
              // close tag
              out_html += '</tbody>';
              // render templates
              dataFn_R.html(out_html);
              var timeoutID = window.setTimeout($.table_of_contacts.report.getJson, 3000);
              // error 
          }).error(function (j, t, e) {
              // render error.
              dataFn_R.html('<span class="error_table">' +
                          'Error = ' + e +
                          '</span>');

          });
      },

      // head table template
      tpl: function () {
          var html = '<thead>' +
              '<tr>' +
              '<th>AgentRealtimeInfoId</th>' +
              '<th>AgentId</th>' +
              '<th>AgentStatus Name</th>'+    
              '<th>StatusTimestamp</th>' +              
              '</tr>' +
              '</thead>' +
              '<tbody >';
          return html;
      },
      // inner template
      tpl_inner: function (obj) {

          var html = '<tr>' +
              
              '<td>' + obj.AgentRealtimeInfoId + '</td>' +
             '<td>' + obj.AgentId + '</td>' +
              '<td>' + obj.AgentStatus + '</td>' +
              '<td>' + obj.StatusTimestamp + '</td>' +
             // '<td>'+
             // '<a href="'+obj.web+'" title="'+
             // obj.name + ' ' + obj.last+'">'+
             // obj.web +
             // '</td>'+
              '</tr>';
          return html;
      }

  };
  // on ready render data
  $(document).ready(function() {
      $.table_of_contacts.get.init();
      $.table_of_contacts.report.init();
  });
})().call(this);
