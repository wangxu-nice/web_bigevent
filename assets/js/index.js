$(function() {
    getUserInfo();
    $('#btn-logout').on('click', function() {
        var layer = layui.layer;
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);

        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderavatar(res.data);

        },


    })
}

// 渲染用户头像
function renderavatar(res) {
    var name = res.nickname || res.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()

    }


}