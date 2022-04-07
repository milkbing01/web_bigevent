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
                console.log(res);
                if (res.status != 0) {
                    return layer.msg = "获取用户信息失败!"
                }
                // else if (res.status == 0 && res.message == "获取用户基本信息成功！") {
                //     console.log("获取用户基本信息成功！");
                //     alert("获取用户基本信息成功!")
                //     return layer.msg = "获取用户基本信息成功!"
                // }
                form.val("formUserInfo", res.data);
            }
        });
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
})



