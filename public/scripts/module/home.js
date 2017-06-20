$(function () {
  var param = location.search
  if (param.indexOf('signin') !== -1) {
    $('#signin-modal').modal('toggle')
  }else if(param.indexOf('update') !== -1){
    //$('#posadd-modal').modal('toggle')
  }

  // $('#nav-list li').on('click', function () {
  //   $(this).addClass('active').siblings().removeClass('active')
  // })

  var path = location.pathname
  if (path === '/') {
    $('#nav-list li').eq(0).addClass('active').siblings().removeClass('active')
  } else {
    $('#nav-list li').eq(1).addClass('active').siblings().removeClass('active')
  }

})
