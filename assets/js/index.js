$(function () {
    const { layer } = layui
    //用户登录
    getUserInfo()
    //用户退出
    userLogout()

})
//获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
    });
}

//获取用户头像的函数
function renderAvatar(user) {
    //设置和渲染欢迎用户文本
    let name = user.nickname || user.username
    $("#welcome").html(`欢迎${name}`)
    //用户头像不为空
    if (user.user_pic !== null) {
        $(".text-avatar").hide()
        $(".layui-nav-img").attr("src", user.user_pic).show()
    }
    //用户头像为空
    else {
        $(".layui-nav-img").hide()
        const first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}

//用户退出的函数
function userLogout() {
    return $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = "./login.html"
            //用自带的索引关闭弹出层
            layer.close(index);
        });
    })
}

