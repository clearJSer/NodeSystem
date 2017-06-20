var express = require('express')
var router = express.Router()

$("#poslist").on('click',function(e){
    if(e.target.type === 'del'){
        if(window.confirm('确定删除该条记录吗？')){
            router.get('/', function (req, res) {
                res.redirect('/api/position/list')
            })
        }
    }else if(e.target.type === 'update'){
        alert('xxxx')
    }

})

function update(obj){
     $('#update-modal').modal('toggle');
     var id = $(obj).closest("tr").children().eq(0).html()
     var name = $(obj).closest("tr").children().eq(2).html()
     var logoSrc = $(obj).closest("tr").find("img").attr("src")
     var span = $(obj).closest("tr").children().eq(4).html()
     var rate = $(obj).closest("tr").children().eq(5).html()
     var stepAmount = $(obj).closest("tr").children().eq(6).html()
     $("#pid-edit").val(id);
     $("#name-edit").val(name);
     $("#span-edit").val(span);
     $("#rate-edit").val(rate);
     $("#stepAmount-edit").val(stepAmount);
     $("#logo-edit").val(logoSrc.substr(logoSrc.lastIndexOf('/')+1))
}   
