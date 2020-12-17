$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,  切不能有空格'],
        samePwd: function(value) {
            if (value === $('#oldpwd').val()) {
                return ('新旧密码不能一致')
            }
        },
        rePwd: function(value) {
            if (value !== $('#newpwd').val()) {
                return ('两次密码不一致')
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功');
                $('.layui-form')[0].reset()
                    // $('#btn-reset').click()
            }
        })
    })
})