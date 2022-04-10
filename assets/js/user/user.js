$(function () {
    const { form, layer } = layui
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6个之间！"
            }
        }
    })
    initUserInfo()

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg = "获取用户信息失败!"
                }
                form.val("formUserInfo", res.data);
            }
        });
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听文章中心>基本资料的提交表单的事件
    $('.layui-form').on('submit', function (e) {
        const url = '/my/userinfo'
        const data = $('.layui-form').serialize()
        e.preventDefault();
        $.post(url, data, res => {
            console.log("以下是data");
            console.log(data);
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            } 
            layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
        });
    });
})