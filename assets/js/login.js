$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    console.log("点击了去注册按钮");
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_log').on('click', function () {
    console.log("点击了去登录按钮");
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象和layer对象
  const form = layui.form
  const layer = layui.layer
  //给form对象添加自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]
  })
})

//监听注册表单的提交事件
$('#form_reg').on('submit', e => {
  e.preventDefault()
  console.log('点击了注册按钮');
  const url = '/api/reguser'
  const data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val(),
  }
  $.post(url, data, res => {
    console.log('回调函数执行成功');
    if (res.status !== 0) {
      return layer.msg('注册失败');
    } else {
      layer.msg('注册成功')
      $('#link_log').click()
    }
  })
})

$('#form_login').submit(function (e) {
  e.preventDefault()
  const url = '/api/login'
  const data = $(this).serialize()
  // console.log(data);
  $.ajax({
    url: url,
    method: 'POST',
    data: data,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
      localStorage.setItem('token', res.token)
      location.href = './index.html'
    }
  })
})