$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide()
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能为出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 注册事件

    $('#form-reg').on('submit', function(e) {
        var data = {
            username: $('.reg-name').val(),
            password: $('.reg-pwd').val()
        }
        e.preventDefault();
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录');
            $('#link-login').click()
        })

    })

    //登录事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: $('.login-name').val(),
                password: $('.login-pwd').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }


        })
    })
})