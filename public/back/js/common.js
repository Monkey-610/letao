// 测试进度条方法
//NProgress.start();  // 开启进度条
//
//setTimeout(function() {
//  // 结束进度条
//  NProgress.done();
//}, 2000);

/*
 * 
 *
 * 
 * ajax全局事件
 *    .ajaxComplete()  当每个ajax完成时,调用     (不管成功还是失败)
 *    .ajaxSuccess()   当ajax返回成功时调用
 *    .ajaxError()     当ajax返回失败时调用
 *    .ajaxSend()      当ajax发送前调用
 *
 *    .ajaxStart()     当第一个ajax发送时调用
 *    .ajaxStop()      当全部的ajax请求完成时调用
 * */

/* 需求: 在第一个ajax发送的时候, 开启进度条
   在全部的ajax回来的时候, 关闭进度条 */
$(function () {
  $(document).ajaxStart(function () {
    NProgress.start()
  });
  /* $(document).ajaxStart(function () {
    NProgress.set(0.5)
  }); */
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done()
    }, 1000)
  });

})

// 等待页面dom结构的加载后执行
$(function () {
  // 注册事件完成公共功能
  // 功能1: 左侧二级导航切换效果
  $(".lt_aside .category").on('click', function () {
    // alert('aaa');
    $(".lt_aside .children").stop().slideToggle()
  });
   // 功能2: 左侧菜单切换效果
  $(".icon_left").on("click", function() {
    $(".lt_aside").toggleClass("hidemenu")
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  });
  // 退出两种方式
  // 1. 发ajax让后台, 销毁当前用户的登录状态, 实现退出   (推荐)
  // 2. 清除浏览器缓存, 将cookie清空, 本地存储的 sessionId 也没了
  // 给退出按钮, 添加点击事件, 需要在退出时, 销毁当前用户的登录状态
  $("#logoutBtn").on ("click", function (){
    $.ajax({
      type: "GET",
      url: "/employee/employeeLogout",
      datatype: "json",
      success: function(info) {
        // console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })
})