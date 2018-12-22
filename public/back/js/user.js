

$(function () {
  var currentPage = 1
  var pageSize = 5
  var currentId
  var isDelete
  render()
  function render() {
    $.ajax ({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,
  
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl', info)
        $('tbody').html(htmlStr)
  
  
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil( info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render()
          }
        });
      },
      
    })
  }


  $('tbody').on('click', 'button', function () {
    // console.log(444);
    currentId = $(this).parent().data("id")
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1
    $('#submitBtn').on('click', function () {
      // console.log(222);
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: currentId,
          isDelete: isDelete,
        },
        dataType: "json",
        success: function (info) {
          console.log(info);
          if ( info.success ) {
            $('#logoutModal').modal("hide")
            render();
          }
          
        } 

      })
      
    })
    
  })
 
})