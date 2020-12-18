$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;


    //    时间过滤器
    template.defaults.imports.dataFormat = function(data) {
        const dd = new Date(data);
        var y = dd.getFullYear();
        var m = dd.padZron(getMonth() + 1);
        var d = dd.padZron(getDate());
        var h = dd.padZron(getHours());
        var mm = dd.padZron(getMinutes());
        var s = dd.padZron(getMinutes());
        return y + '-' + m + '-' + d + '' + h + ':' + mm + ':' + s
    }

    // 补零函数
    function padZron(n) {
        return n > 9 ? n : '0' + n
    }

    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示的数据条数
        cate_id: '', //文章分类id
        state: '', //文章状态
    }



    initTable();
    initArtcate();

    //   获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);

                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                // layer.msg('获取文章列表成功')
                renderPage(res.total)
            }
        })
    }

    // 初始化下拉文章分类数据
    function initArtcate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章分类获取失败')
                }
                // layer.msg('文章获取成功')
                var htmlStr = template('tpl-cate', res);
                $('#sel-cate').html(htmlStr);
                // 通知leyui重新渲染表单区域ui结构
                form.render()
            }
        })
    }

    // 为筛选框绑定提交事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('#sel-cate').val();
        var state = $('#sel-state').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable()


    })

    //创建分页区域
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //分页容器
            count: total, //数据总数
            limit: q.pagesize, //每页数据条数
            curr: q.pagenum, //默认选中分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            //调用renderpage函数会触发jump
            //点击页码会触发jump   

            jump: function(obj, first) {
                q.pagenum = obj.curr; //最新页码值赋值给q
                q.pagesize = obj.limit; //最新条目数赋值给pagesize
                if (!first) {
                    initTable()
                }

            }
        });
    }

    //删除文章
    $('tbody').on('click', '#btn-delete', function() {
        // 获取删除按钮的个数
        var len = $('#btn-delete').length;
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功');
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})