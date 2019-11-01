$(function () {
    $('#addCategory').on('submit', function () {
        // 获取用户在表单中输入的内容
        var formData = $(this).serialize();
    
        // 向服务器端发送请求 添加分类
        $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function () {
                location.reload();
            }
        })
        // 阻止表单默认提交行为
        return false;
    });

    // 发送ajax请求 向服务器端所有分类列表数据
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            // 将服务器端返回的数据和HTML模板进行拼接
            var html = template('listTpl', {
                data: response
            });
            // 将拼接好的内容放到页面中
            $('#cateListBox').html(html);
        }
    });
    //编辑文章分类信息
    $('#cateListBox').on('click','.edit',function () {
        //获取要修改的用户id
        var id = $(this).attr('data-id')
    
        $.ajax({
            url:`/categories/${id}`,
            type:'get',
            success:function (data) {
                var html = template('modiyTpl', data)
                $('#formBox').html(html)
                
            }
        })
    })

    //提交修改表单
    $('#formBox').on('submit','#modiyFormtit',function () {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id')
        $.ajax({
            url:`/categories/${id}`,
            type:'PUT',
            data:formData,
            success: function (data) {
                location.reload()
            }
        })
        return false;
    })

    //删除分类
    $('#cateListBox').on('click','.delete',function () {
        var id = $(this).attr('data-id')
       
        $.ajax({
            url:`/categories/${id}`,
            type:'delete',
            success: function () {
                location.reload();
            }
        })
    })
})