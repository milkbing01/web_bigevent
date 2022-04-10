$(function () {
    //自定义校验规则
    const { form, layer } = layui
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if ($('[name=oldPwd]').val() == value) {
                return layer.msg = "新密码与旧密码一致，请重新输入"
            }
        },
        rePwd: function (value) {
            if ($('[name=rePwd]').val() !== value) {
                return layer.msg = "新密码与确认密码不一致，请重新输入"
            }
        }
    })

    //发起修改密码的ajax请求
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: "/my/updatepwd",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败")
                }
                layer.msg("更新密码成功")
                // console.log(window.parent.hasOwnProperty('userLogout'));
                // localStorage.removeItem('token')
                // window.location.reload = "../login.html"
            }
        });
    })
})