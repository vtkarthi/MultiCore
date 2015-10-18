/* activate scrollspy menu */
$('body').scrollspy({
  target: '#navbar-collapsible',
  offset: 52
});

/* smooth scrolling sections */
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 800);
        
        if (this.hash=="#section1") {
            $('.scroll-up').hide();
        }
        else {
            $('.scroll-up').show();
        }
        
        
        // activte animations in this section
        target.find('.animate').delay(1200).addClass("animated");
        setTimeout(function(){
            target.find('.animated').removeClass("animated");
        },2000);
        
        return false;
      }
    }
});


function Clear() {
    $('[type="text"]').val('');
}




var edit = 0;
//To Create new record and Edit an existing Record.  
function savef() {
    var Product = {
        Id: '',
        Name: '',
        Type: '',
    };
    Product.Id = $("#pid").val();
    Product.Name = $("#pn").val();
    Product.Type = $("#pt").val();

    if (edit != 1) {

        $.ajax({
            type: "POST",
            url: 'api/Product',
            data: Product,
            success: function (data, status) {
                $.table_of_contacts.get.getJson();
                Clear();
                $('html, body').animate({
                    scrollTop: $("#section2").offset().top + 20
                }, 2000);
            },

        });

    } else {
        //Edit the record 

        $.ajax({
            type: "PUT",
            url: 'api/Product/' + Product.Id,
            data: Product,
            success: function (data, status) {
                $.table_of_contacts.get.getJson();
                Clear();
                $('html, body').animate({
                    scrollTop: $("#section2").offset().top + 20
                }, 2000);
            },

        });

        //$.ajax({
        //    url: URL,
        //    type: 'PUT',
        //    data: JSON.stringify(Product),
        //    //contentType: 'application/json',
        //    success: function (result) {
        //        alert("success?");
        //    }
        //});

        //Student.StudentID = $scope.StudentID;
        //var promisePut = CRUD_OperService.put($scope.StudentID, Student);
        //promisePut.then(function (pl) {
        //    $scope.Message = "Student Updated Successfuly";
        //    GetAllRecords();
        //    ClearModels();
        //}, function (err) {
        //    console.log("Err" + err);
        //});
    }
}

//To Delete Record  
function del(pid) {

    $.ajax({
        type: "DELETE",
        url: 'api/Product/'+pid,
        //data: pid,
        success: function (data, status) {
            $.table_of_contacts.get.getJson();
            Clear();
        },

    });

}

function edt(pid,Name,Type) {
    edit = 1;
    $("#pid").val(pid);
    $("#pn").val(Name);
    $("#pt").val(Type);

    $('html, body').animate({
        scrollTop: $("#section4").offset().top + 20
    }, 2000);

}


