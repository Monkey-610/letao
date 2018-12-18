;
(function () {

  $(function () {
    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空, 长度必须是 2-6 位
    //              (2) 密码不能为空, 且必须是 6-12 位
    $('#form').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        //校验用户名，对应name表单的name属性
        username: {
          validators: {
            //不能为空
            notEmpty: {
              message: '用户名不能为空'
            },
            //长度校验
            stringLength: {
              min: 2,
              max: 6,
              message: '用户名长度必须在2到6之间'
            },
            callback: {
              message: "用户名不存在"
            }
          }
        },
        password: {
          validators: {
            //不能为空
            notEmpty: {
              message: '密码不能为空'
            },
            //长度校验
            stringLength: {
              min: 6,
              max: 12,
              message: '用户名长度必须在6到12之间'
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    });


    // 2. 进行登录请求
    //    通过 ajax 进行登录请求

    // 表单校验插件有一个特点, 在表单提交的时候进行校验
    // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
    // 如果校验失败, 默认会阻止提交
    $("#form").on('success.form.bv', function (e) {
      e.preventDefault();
      //使用ajax提交逻辑

      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $("#form").serialize(),
        dataType: "json",
        success: function (info) {
          console.log(info);
          if (info.success) {
            // alert("登录成功")
            location.href = "index.html";
          }
          if (info.error === 1000) {
            // alert("用户名不存在")
            $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
          }
          if (info.error === 1001) {
            // alert("密码错误")
            $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
          }

        }
      });
    });

    // 3. 重置功能实现
    $('[type=reset]').on("click", function () {
      // console.log( 555 );
      $('#form').data("bootstrapValidator").resetForm()
    });


  })
})()