$(function () {
    const { layer } = layui
    // 1.1 获取裁剪区域的 DOM 元素
    const $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑模拟定点击事件
    $('#btnChooseImage').on('click', () => {
        $('#file').click()
    })

    $('#file').on('change', (e) => {
        console.log(e);
        if (e.target.files.length == 0) {
            return layer.msg('请选择照片')
        }
        //1.拿到用选择的文件
        const firstfile = e.target.files[0]
        //2.将用户选择的文件转换为url地址
        const url = URL.createObjectURL(firstfile)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', url) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', () => {
        const baseImg = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('img/png')

        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: baseImg
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        });
    })
})
