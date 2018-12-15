;
(function () {
  // 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空, 长度必须是 2-6 位
  //              (2) 密码不能为空, 且必须是 6-12 位
  $(function () {
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
            /* callback: {
              message: "用户名不存在"
            } */
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
            /* callback: {
              message: "用户名不存在"
            } */
          }
        }
      }
    })
  })
})()