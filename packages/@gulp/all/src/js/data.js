var v2prefix = baseConfig.service.PRIX.substring(0, baseConfig.service.PRIX.length - 1);
// var v2prefix = 'http://192.168.1.72/';

/** v2接口调用 */
function asyncV2Service(appendurl, fdata, callback, errorcallback, errbeforeback) {
  if (!window.localStorage.currentPkTag || !window.localStorage.xsbtoken) {
    dologout();
    return;
  }
  if(appendurl !== '/video/ptz') app.preloader.show();
  var isSync = false; // 是否同步
  // 手机端infinite加载更多[否则异步查询会跳到顶部] 、菜单列表[初次加载必须执行完后再继续后面的查询，否则某些页面接口返回快出现报错]
  if ($$('.my-card-list') && $$('.my-card-list').css('display') != 'none' && fdata && fdata.start > 0 || appendurl == '/homepage/listMenu2') {
    isSync = true;
  }
  app.request({
    url: v2prefix + "api/v2/pk/" + (window.localStorage.currentPkTag || 0) + appendurl,
    method: "POST",
    processData: true,
    contentType: "application/json",
    async: isSync ? false : true, //true:默认为异步
    timeout: isSync ? 30 : 0,
    headers: {
      Authentication: "Bearer " + window.localStorage.xsbtoken
    },
    data: fdata,
    success: function(data, status, xhr) {
      app.preloader.hide();
      var r = JSON.parse(data).r;
      if (callback) callback(r);
    },
    error: function(xhr) {
      app.preloader.hide();
      if (errbeforeback) errbeforeback();
      if (xhr.status == 401) {
        app.dialog.alert("凭证过期，请重新登录", function() {
          if (appendurl.indexOf('users/logout') !== -1) {
            dologout();
          } else { 
            logout();
          }
        });
      } else {
        var restext = xhr.responseText;
        var errtext = restext.indexOf('{') == 0 && JSON.parse(restext).error ? JSON.parse(restext).error : restext;
        app.dialog.alert(errtext, function() {
          if (errorcallback) errorcallback(errtext);
        });
      }
    }
  });
}

function asyncV2UrlService(url, fdata, callback, errorcallback, errbeforeback) {
  if (!window.localStorage.xsbtoken) {
    dologout();
    return;
  }
  app.preloader.show();
  app.request({
    url: v2prefix + url,
    method: "POST",
    processData: true,
    contentType: "application/json",
    async: url == 'api/v2/users/listParking' ? false : true, //true:默认为异步 初次加载listParking必须同步执行完后再继续后面的查询
    timeout: url == 'api/v2/users/listParking' ? 30 : 0,
    headers: {
      Authentication: "Bearer " + window.localStorage.xsbtoken
    },
    data: fdata,
    success: function(data, status, xhr) {
      app.preloader.hide();
      // 获取车场底图数据直接返回
      if (url.indexOf('getLotAreaBG') !== -1) {
        if (callback) callback(data);
        return;
      }
      var r = JSON.parse(data).r;
      if (callback) callback(r);
    },
    error: function(xhr) {
      app.preloader.hide();
      if (errbeforeback) errbeforeback();
      if (xhr.status == 401) {
        app.dialog.alert("凭证过期，请重新登录", function() {
          if (url.indexOf('users/logout') !== -1) {
            dologout();
          } else { 
            logout();
          }
        });
      } else if (url.indexOf('getLotAreaBG') !== -1 && xhr.status == 404) {
        app.dialog.alert('未获取到背景图');
      } else {
        var restext = xhr.responseText;
        var errtext = restext.indexOf('{') == 0 && JSON.parse(restext).error ? JSON.parse(restext).error : restext;
        app.dialog.alert(errtext, function() {
          if (errorcallback) errorcallback(errtext);
        });
      }
    }
  });
}

/** v2接口-获取图片二进制流 */
function asyncV2ImgService(appendurl, fdata) {
  if (!window.localStorage.currentPkTag || !window.localStorage.xsbtoken) {
    dologout();
    return;
  }
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('POST', v2prefix + 'api/v2/pk/' + window.localStorage.currentPkTag + appendurl, true);
    req.responseType = 'blob';
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Authentication', "Bearer " + window.localStorage.xsbtoken);
    
    req.onload = function() {
      var data = req.response;
      if (req.status == 200) {
        resolve(data);
      } else {
        reject();
      }
    };
    req.send(JSON.stringify(fdata));
  });
  
}

/** v2接口-下载文件 */
function asyncV2DownService(appendurl, params) {
  if (!window.localStorage.currentPkTag || !window.localStorage.xsbtoken) {
    dologout();
    return;
  }
  var req = new XMLHttpRequest();
  req.open('POST', v2prefix + 'api/v2/pk/' + window.localStorage.currentPkTag + appendurl, true);
  req.responseType = 'blob';
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('Authentication', "Bearer " + window.localStorage.xsbtoken);
  
  req.onload = function() {
    var data = req.response;
    if (req.status == 200) {
      var filedesc = req.getResponseHeader('Content-Disposition');
      var filename = decodeURI(filedesc || '').split("''");
      var blob = new Blob([data], {type: data.type});
      downLoadFile(blob, filename.length > 1 ? filename[1] : '列表数据.xls');
    } else {
      if (data.type == 'application/json') {
        var reader = new FileReader();
        reader.readAsText(data, 'utf-8');
        reader.onload = function (e) {
          if (e.target.result.indexOf('empty record') !== -1) {
            app.dialog.alert('导出记录不能为空');
          } else {
            app.dialog.alert('导出失败');
          }
        }
        return;
      }
      app.dialog.alert('导出失败');
    }
  };
  req.send(JSON.stringify(params));
}

function downLoadFile(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    // IE10
    navigator.msSaveBlob(blob, fileName);
  } else {
    saveAs(blob, fileName);
    // 下面的a链接下载,火狐不支持
    // var link = document.createElement("a");
    // link.style.display = "none";

    // link.href = window.URL.createObjectURL(blob); //创建一个指向该参数对象的URL
    // link.download = fileName;
    // link.click(); // 触发下载
    // URL.revokeObjectURL(link.href); // 释放通过 URL.createObjectURL() 创建的 URL
  }
}

/**
 * @param {*} 接口方法名 funcUrl 
 * @param {*} 参数 formData 
 */
function asyncPKService(func, formData, callback, errorcallback) {
  app.preloader.show();
  app.request({
    url:
      baseConfig.service.PRIX +
      "/AsyncPKService/" + func + "?resid=" + window.localStorage.currentPkTag,
    method: "POST",
    processData: true,
    contentType: "application/json",
    async: false,
    timeout: 30,
    headers: {
      Authentication: "Bearer " + window.localStorage.xsbtoken
    },
    data: formData,
    success: function(data) {
      var r = JSON.parse(data).r;
      app.preloader.hide();
      if (callback) callback(r);
    },
    error: function(xhr) {
      app.preloader.hide();
      if (xhr.status == 401) {
        app.dialog.alert("凭证过期，请重新登录", function() {
          logout();
        });
      } else {
        var restext = xhr.responseText;
        var errtext = restext.indexOf('{') == 0 && JSON.parse(restext).error ? JSON.parse(restext).error : restext;
        app.dialog.alert(errtext, function() {
          if (errorcallback) errorcallback(errtext);
        });
      }
    }
  });
}

function promiseRequest(funcUrl, formData) {
  return new Promise(function(resolve, reject) {
    asyncPKService(
      funcUrl,
      formData,
      function(data) {
        resolve(data);
      },
      function(msg) {
        reject(msg);
      }
    );
  });
}

function dayPartingParkingUseTime(starttime) {
  var formData = tojsonarray(starttime);
  return promiseRequest('dayPartingParkingUseTime', formData);
}
