// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: "#app", // App root element
  id: "io.framework7.testapp", // App bundle ID
  name: "Framework7", // App name
  theme: "md", // Automatic theme detection
  cache: false,
  data: function() {
    return {};
  },
  view: {
    pushState: true, // 页面切换地址改变
    pushStateSeparator: '#',
    reloadPages: true,
    reloadDetail: true // 页面切换重新加载
  },
  on: {
    routeChange: function(newRoute, previousRoute, router) {
      var currentUrl = newRoute.url;
      // 匹配当前路由的菜单，背景颜色突出
      $$(".home-menu-item").removeClass(CHILD_MENU_ACTIVE_CLASS);
      $$('.home-menu-item[href="'+ currentUrl +'"]').addClass(CHILD_MENU_ACTIVE_CLASS);
      localStorage.currentUrl = currentUrl;
    }
  },
  dialog: {
    title: "提示", // 设置对话框默认标题
    buttonOk: "确定", // change default "OK" button text
    buttonCancel: "取消"
  },
  popup: {
    closeByBackdropClick: false,
  },
  routes: routes,
  panel: {
    swipe: window.localStorage.xsbtoken ? 'left' : '' // 手机端可滑动打开或关闭左侧面板
  }
});

// Init/Create main view
var mainView = app.views.create(".view-main", {
  url: "/",
  on: {
    pageInit: function() {
      if (!Template7.global || !Template7.global.noMenuAuthor) {
        $$('.view-main').show();
      } 
      if (isIE() && localStorage.xsbtoken) {
        $$('#my-login-screen').hide();
      } else {
        $$('#my-login-screen').show();
      }
    }
  }
});
mainView.allowPageChange = true;
var menuLength;
var refreshInterval;

// 从地址栏中获取参数token
function getUrlQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  } 
  return null;
}

// url地址方式 传递token等值
if (window.location.search && getUrlQueryString('pktag')) {
  window.localStorage.currentPkTag = getUrlQueryString('pktag');
}

if (window.location.search && getUrlQueryString('xsbtoken')) {
  window.localStorage.xsbtoken = getUrlQueryString('xsbtoken');
  window.localStorage.xsbnickname = getUrlQueryString('xsbnickname');
  window.localStorage.xsbuserid = getUrlQueryString('xsbuserid');
  // 用于跳转到登录前最近一次历史地址或者指定地址
  window.localStorage.pklasturl = getUrlQueryString('redirect') ? '#' + getUrlQueryString('redirect') : (location.hash || '');
  if (getUrlQueryString('areaname')) { // 用于外部链接跳转到指定区域热力图
    window.localStorage.areaname = getUrlQueryString('areaname');
  }
  if (getUrlQueryString('pkname')) {
    window.localStorage.currentPkCname = getUrlQueryString('pkname');
  }
  window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname + window.localStorage.pklasturl;
}

if (window.localStorage.xsbtoken) {
  $$(".pkname").text(window.localStorage.currentPkCname);
  $$(".nickname").text(window.localStorage.xsbnickname);
  refreshInterval && clearInterval(refreshInterval);
  refreshInterval = setInterval(function() {
    // 每天零点自动刷新页面
    if (new Date().getHours() == 0) {
      // 每次文件更新时，index.html文件中引用css，js和routes.js引用的html需要加上新版本号
      window.location.reload();
    }
  }, 60 * 60 * 1000);
} else {
  app.panel.close('left');
  goToLoginSys();
}

function goToLoginSys() {
  var seachurl = '?sys=pk' + (location.hash ? '&redirect=' + location.hash.replace('#', '') : '');
  window.location.href = window.location.protocol + '//' + window.location.host + '/login/' + seachurl;
  // window.location.href = 'http://localhost:9009/index' + seachurl; // 本地测试使用
}

function initUserParkingList() {
  var parkingLotList = [];
  //如果已经登录
  if (window.localStorage.xsbtoken) {
    parkingLotList = getUserParkingList();
  } else {
    return;
  }

  var parkTemplate = '<ul>{{#each managerParking}}\
      <li><a href="#" data-url="/parking/home" data-tag="{{tag}}" data-cname="{{cname}}" data-type="{{ctype}}"\
        class="parking-item parking-list-item{{@index}}" data-animate="false" data-ignore-cache="true">{{cname}}</a></li>\
    {{/each}}</ul>';
  var compiledTemplate = Template7.compile(parkTemplate);
  var innerHTML = compiledTemplate({ managerParking: parkingLotList });
  $$(".parking-list-container").html(innerHTML);

  if (parkingLotList.length <= 1) {
    $$(".parking-list-container").hide(); // 停车场列表最多只有一个，则不显示停车场选择下拉
  }

  $$(".parking-item").off("click");
  $$(".parking-item").on("click", function() {
    $$(".parking-item").removeClass(CHILD_MENU_ACTIVE_CLASS);
    $$(this).addClass(CHILD_MENU_ACTIVE_CLASS); // 选中样式类名

    var lastPktag = window.localStorage.currentPkTag; // 记录上一次选择的停车场
    window.localStorage.currentPkTag = $$(this).attr("data-tag");
    window.localStorage.currentPkCname = $$(this).attr("data-cname");
    var currentPkType = $$(this).attr("data-type"); // 停车场类型

    setGlobalContext("currentPkTag", window.localStorage.currentPkTag);
    setGlobalContext("currentPkCname", window.localStorage.currentPkCname);
    setGlobalContext("xsbtoken", window.localStorage.xsbtoken);
    setGlobalContext("isRoadside", currentPkType === 'L'); // 是否是路边停车场

    $$('#topnav').css('width', 'calc(100% - 560px)');
    $$(".pkname").text(window.localStorage.currentPkCname); // 设置显示的停车场名称

    // 增加样式class, 用于区分路内和场库车场下的页面样式
    $$(".main-view-container").removeClass('side-view').removeClass('normal-view');
    $$(".main-view-container").addClass(currentPkType === 'L' ? 'side-view' : 'normal-view'); // 增加class，用于场库，路内样式区分
    
    HOME_PAGE_URL = currentPkType === 'P' ? '/charging/home' : '/parking/home'; // C充电桩车场

    initSubMenu(window.localStorage.currentPkTag); // 初始化菜单
    
    if (isPhone()) {
      setTimeout(function() { $$("div.sub").hide(); }, 500);
    }
  });

  // 首次登录进入系统或者刷新，默认进入第一个停车场
  if (window.localStorage.xsbtoken) {
    var curPkTag = window.localStorage.currentPkTag;
    var findPk = parkingLotList.find(function (m) { return m.tag == curPkTag; });
    if (curPkTag && findPk) { // 有上一次进入的停车场权限，默认再次进入此停车场
      $$('.parking-item[data-tag="'+ curPkTag +'"]').click();
    } else {
      $$(".parking-list-item0").click();
    }
  }
}

function getUserParkingList() {
  var myParkList = [];
  asyncV2UrlService('api/v2/users/listParking', {}, function(data) {
    // 停车场按名称排序
    (data || []).sort(function(a,b){return a.cname.localeCompare(b.cname)});
    myParkList = data || [];
  });
  return myParkList;
}

function logout() {
  if (!window.localStorage.xsbtoken) {
    dologout();
    return;
  }
  asyncV2UrlService('api/v2/users/logout', {}, function() {
    dologout();
  });
}

function dologout() {
  refreshInterval && clearInterval(refreshInterval);
  if (eventbusinterval != null) clearInterval(eventbusinterval);
  if (eb && eb.state == EventBus.OPEN) {
    eb.close(); 
  }
  window.sessionStorage.clear();
  // 清除本地緩存[除loginWay,currentPkTag外]
  Object.keys(localStorage).forEach(function(key) {
    if (['currentPkTag', 'loginWay'].indexOf(key) == -1) {
      delete localStorage[key];
    }
  });
  $$(".mobile").val("");
  $$(".code").val("");
  $$(".password").val("");
  // $$(".home-navbar").hide();
  $$('.popup').hide();
  $$('.backdrop-in').remove();
  app.panel.close('left');
  app.panel.disableSwipe('left');
  // mainView.router.navigate("/person/login", { animate: false });
  $$('.view-main').show();
  // $$('#my-login-screen').show();
  goToLoginSys();
}

function initSubMenu(pktag) {
  if (window.localStorage.xsbtoken) {
    var subMenuListResult = [];
    asyncV2Service('/homepage/listMenu2', {app: "pk", pktag: +pktag}, function(data) {
      subMenuListResult = data;

      var hasCurMenu = false; // 用于切换停车场时，菜单是否存在，存在直接保留当前路由   
      var pathurl = location.hash.replace(/#/g, '');
      pathurl = pathurl == '/person/login' ?  HOME_PAGE_URL : pathurl; // 为登录页面直接进入首页
      var firsthasurl = '';
      subMenuListResult.forEach(function(m) {
        if (!firsthasurl && m.url) {
          firsthasurl = m.url;
        }
        m.url = m.url || '#'; // 主菜单有url,表示点击可跳转，否则不跳转展开子菜单列表
        m.children = m.children || [];
        // 搜索第一个有权限的菜单
        if (!firsthasurl && m.children.length) {
          firsthasurl = m.children[0].url;
        }
        // 设置主菜单选中状态
        var findChildMenu = m.children.find(function(cu) {return cu.url === pathurl;});
        if (m.url == pathurl || findChildMenu || 
          (m.cname == '车辆管理' && pathurl.indexOf('/cars/card/record/') !== -1 && m.children.find(function(cu) {return cu.url === '/cars/card';})) || 
          (m.cname == '查询' && pathurl.indexOf('/query/charge-warn-detail/') !== -1 && m.children.find(function(cu) {return cu.url === '/query/charge-warn-list';})) || 
          (m.cname == '商券管理' && pathurl.indexOf('/coupon/detail/') !== -1 && m.children.find(function(cu) {return cu.url === '/coupon/coupons';}))) {
          hasCurMenu = true;
          m.className = MAIN_MENU_ACTIVE_CLASS;
        }
        if (findChildMenu) {
          findChildMenu.className = CHILD_MENU_ACTIVE_CLASS;
        }
        // 热力图打开新的标签页并全屏显示
        var findRLtMenu = m.children.find(function(cu) {return cu.url === '/control/park-heat-map';});
        if (findRLtMenu) {
          findRLtMenu.target = true;
        }
      });

      // 存储菜单数组长度，根据菜单个数设置对应的顶部菜单样式
      menuLength = subMenuListResult.length;
      // 存储菜单权限
      localStorage.setItem('menus', JSON.stringify(subMenuListResult));

      setGlobalContext('noMenuAuthor', false); // 默认为有权限

      // 有此路由菜单，则直接加载此页面，否则跳转到首页或者第一个菜单地址或者无任何内容
      if (!hasCurMenu && pathurl !== '/control/config-heat-map' && pathurl !== '/control/park-heat-map' && pathurl !== '/control/config-led-screen' && pathurl.indexOf('/control/park-map') == -1) {
        var fm = subMenuListResult.find(function(sm) { return sm.url === HOME_PAGE_URL; });
        if (fm) { // 没有该地址权限，加载首页
          fm.className = MAIN_MENU_ACTIVE_CLASS;
          window.localStorage.pklasturl = HOME_PAGE_URL;
          mainView.router.updateCurrentUrl(HOME_PAGE_URL);
          window.location.reload(); // 首次进入无权限的菜单必须重载页面，使用navigate无法跳转到指定页面或者延迟跳转
          // mainView.router.navigate(HOME_PAGE_URL, {reloadCurrent: true, ignoreCache: true, reloadAll: true });
        } else if (firsthasurl) { // 沒有主页权限，加载第一个
          window.localStorage.pklasturl = firsthasurl;
          mainView.router.updateCurrentUrl(firsthasurl);
          window.location.reload();
        } else { // 无任何菜单
          setGlobalContext('noMenuAuthor', true); // 设置无菜单权限
          app.dialog.alert('暂无任何菜单权限');
          $$('.view-main').hide();
        }
      } else {
        window.localStorage.pklasturl = pathurl;
        if (isIE()) {
          setTimeout(function(){mainView.router.navigate(pathurl, { animate: false, reloadCurrent: true });}, 50);
        } else {
          mainView.router.navigate(pathurl, { animate: false, reloadCurrent: true });
        }
      }
    });

    // <!-- 菜单列表 -->
    var subMenuListTemplate = '{{#each menuList}}\
      <li><a href="{{url}}" class="home-menu {{className}}">{{cname}}</a>\
        <div class="sub"><ul>\
          {{#each children}}\
            <li>\
              {{#if target}}\
                <a data-view=".view-main" data-href="{{url}}" href="#" class="home-menu-item {{className}}">{{cname}}</a>\
              {{else}}\
                <a href="{{url}}" data-view=".view-main" class="home-menu-item {{className}}"\
                  data-animate="true" data-reload-current="true">{{cname}}</a>\
              {{/if}}\
            </li>\
          {{/each}}\
        </ul></div>\
      </li>\
    {{/each}}';

    var compiledSubMenuListTemplate = Template7.compile(subMenuListTemplate);
    var innerHTML = compiledSubMenuListTemplate({ menuList: subMenuListResult });
    $$("#topnav").html(innerHTML);
    $$("#topnavLeft").html(innerHTML); // 填充左侧菜单面板内容
    
    changeMenuDisplayAndStyle(subMenuListResult.length);
    
    initLogo();

    // 页面元素添加后再绑定事件
    if (Template7.global && Template7.global.hoverConfig) {
      $("ul#topnav > li").hoverIntent(Template7.global.hoverConfig);
    }
  }
}

function initLogo() {
  if (!localStorage.currentPkTag) {
    return;
  }
  var param = {
    pktag: +localStorage.currentPkTag, 
    longitude: 0,  
    latitude: 0
  };
  asyncV2Service('/sitemanage/getParkingPub', param, function(pinfo) {
    localStorage.currentPkOwner = pinfo.ownerid;
    
    var imglogourl = 'logo/' + pinfo.ownerid + '.png';
    var ImgObj = new Image();
    ImgObj.src = imglogourl;
    ImgObj.onload = function() {
      updateLogoImg(imglogourl);
    }
    ImgObj.onerror = function() {
      updateLogoImg('logo/xinge.png');// 默认为信鸽停车图标
    }
  });
}

function updateLogoImg(imglogourl) {
  $$('img.logo').attr('src', imglogourl);
  $$('link[rel="apple-touch-icon"]').attr('href', imglogourl);
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = imglogourl;
  if ($$('link[rel*="icon"]').length == 0) {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

if (localStorage.xsbtoken) {
  // 处理全屏显示时头部菜单栏不允许瞬间显示后又不显示
  if (location.href.indexOf('park-heat-map') !== -1 || location.href.indexOf('/control/park-map') !== -1) {
    $$(".home-navbar").hide();
    $$('#app').addClass('no-navbar');
  } else {
    $$(".home-navbar").show();
    $$('#app').removeClass('no-navbar');
  }

  // 使用链接跳转到对外热力图，无需查询停车场列表及菜单等（防止多次跳转）
  if (location.href.indexOf('/control/park-map') == -1) {
    initUserParkingList(); // 查询停车场列表，并初始化菜单
  }
}

$$(".logout").on("click", function() {
  app.dialog.confirm('确定要退出吗?', function() {
    logout();
  });
}); // 退出登录

// .home-menu .home-menu-item的点击事件都委托给父层，【防止菜单动态变化时事件无效】
$$(".menu-list").on("click touchend", function(e) {
  var curEle = $$(e.target);
  // 记录当前点击的菜单地址
  window.localStorage.pklasturl = curEle.attr('href') || curEle.attr('data-href') || '';
  // 点击主菜单
  if (curEle.hasClass('home-menu')) {
    $$(".home-menu").removeClass(MAIN_MENU_ACTIVE_CLASS);
    curEle.addClass(MAIN_MENU_ACTIVE_CLASS);
  }
  // 点击主菜单下的子菜单
  if (curEle.hasClass('home-menu-item')) {
    $$(".home-menu").removeClass(MAIN_MENU_ACTIVE_CLASS);
    curEle
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".home-menu")
      .addClass(MAIN_MENU_ACTIVE_CLASS);
    // 热力图打开新的标签页
    if (curEle[0].dataset && curEle[0].dataset.href == '/control/park-heat-map') {
      openNewWindowByUrl(curEle[0].dataset.href);
    } else if (curEle[0].attributes && curEle[0].attributes['data-href'] 
      && curEle[0].attributes['data-href'].value == '/control/park-heat-map') { // 兼容ie10
      openNewWindowByUrl(curEle[0].attributes['data-href'].value);
    }
  }
});

function openNewWindowByUrl(url) {
  app.panel.close('left');

  if (isPhone()) {
    window.localStorage.pklasturl = url;
    mainView.router.navigate(url, { animate: false, reloadCurrent: true });
    return;
  }
  window.open(location.href.split('#')[0] + '#' + url);
}

// 点击停车及用户信息，弹出停车场列表层（适用手机端）
$$("ul#topnav1 > li").on('click', function() {
  $(this)
    .find('.sub')
    .stop()
    .fadeTo("fast", 1)
    .show();
});

// dom元素点击或者手机触摸开始事件
$$(document).on('click touchend', function(e) {
  window.isclick = true;
  var x = $$(e.target);
  // 未点击顶部主菜单或者子菜单，未点击当前停车场和登录用户信息，未点击弹出的子菜单【停车场列表】，隐藏所有子菜单
  if (!x.hasClass('home-menu') && !x.hasClass('home-menu-item') && 
    x.parents('.pks').length === 0 && !x.hasClass('parking-item')) {
    $$("div.sub").hide();
  }
  // 点击日期控件处理
  $$('input.date-item').blur();
  // 点击其他位置隐藏日期组件（除日期输入框，日期组件内部）
  if (x[0].nodeName !== 'BODY' && !x.hasClass('date-item') && 
    x.parents('#ui-datepicker-div').length === 0 && !x.hasClass('ui-datepicker') && 
    x.parents('.ui-datepicker-header').length === 0 && 
    x.parents('.ui-datepicker-calendar').length === 0 && 
    x.parents('.ui-timepicker-div').length === 0) {
    $.datepicker._hideDatepicker();
  }

  if (x.hasClass('date-item')) {
    $.datepicker._showDatepicker(e);
    // 带时分秒的时间组件日期改变时不弹出键盘
    $$('td[data-handler="selectDay"]').on('click', function() { $$('input.date-item').blur(); });
    // 日期更改后，ui日期组件会刷新元素并聚焦输入框，需重新绑定事件
    $$('input.date-item').on('change focus input', function() {
      $$('input.date-item').blur();
      $$('td[data-handler="selectDay"]').on('click', function() { $$('input.date-item').blur(); });
    });
  }

  app.ppp && app.ppp.close();
  $$('.pix-pop') && $$('.pix-pop').remove();
  if (x.hasClass('pixel')) {
    $$('.popup-backdrop') && $$('.popup-backdrop').remove();
    // 页面高度超出630,f7自带样式会设置margin,这里margin需要强制为0
    app.ppp = app.popup.create({
      closeByBackdropClick: true,
      content: '<div class="popup pix-pop" style="position: absolute;margin:0 !important;width: 180px;height: 80px;top: 60px;left: 0;border-radius: 10px;white-space: nowrap;">'+
      '<div class="padding-left">'+
        '<p>分辨率：'+(window.screen.width*(window.devicePixelRatio || 1))+'x'+(window.screen.height*(window.devicePixelRatio || 1))+'</p>'+
        '<p>像素比：'+(window.devicePixelRatio || '')+'</p>'+
      '</div>'+
    '</div>'
    });
    app.ppp.open();
  }
});

var resizeTimeout;

function appresize() {
  app.panel.close('left');
  if (!window.localStorage.xsbtoken) {
    return;
  }
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    changeMenuDisplayAndStyle();
  }, 400);
}

// 窗口大小变化，设置左侧面板是否可滑动
window.onresize = appresize;

// 获取可视窗口宽度
function getWindowWidth() {
  var screenWidth = document.body && document.body.clientWidth;
  if (!screenWidth && window.innerWidth) {
    screenWidth = window.innerWidth;
  }
  if (!screenWidth && document.documentElement) {
    screenWidth = document.documentElement.clientWidth;
  }
  return screenWidth;
}

// 设置顶部栏菜单目录，图标，系统名称的显示和样式
function changeMenuDisplayAndStyle(len) {
  var menulen = len || menuLength;
  var swidth = getWindowWidth();

  // 默认
  // $$('.pks').css('padding-right', swidth < 1200 ? '10px' : '30px'); // 屏幕宽度低于1200,停车场信息左边距值变化
  var parkNameWidth = ($$('#topnav1').css('width').split('px')[0] - 0).toFixed(0) - 0 + 2 + 70; // 70：退出宽度
  var perMenuWidth = (menulen >= 8 ? 100 : 110);
  $$('#topnav li a').css('width', perMenuWidth + 'px');
 
  // 52: logo图标宽度， 170：系统名称宽度
  var minWidth = menulen * perMenuWidth + 52 + parkNameWidth;
  var maxWidth = minWidth + 170;
  
  // 左侧面板-设置可滑动
  if (swidth < 768 || swidth < minWidth) {
    app.panel.enableSwipe('left');
  } else {
    app.panel.disableSwipe('left');
  }

  if (!menulen || swidth > maxWidth) {
    $$('.menu-icon').hide();
    $$('#topnav')
      .css('width', 'calc(100% - ' + (parkNameWidth + 52 + 170) + 'px)')
      .css('display', 'inline-flex');
    $$('.sys-name').show();
    return;
  }
  // 菜单显示不开，隐藏系统名称
  if (swidth >= minWidth && swidth <= maxWidth) {
    $$('.sys-name').hide();
    $$('.menu-icon').hide();
    $$('#topnav')
      .css('width', 'calc(100% - ' + (52 + parkNameWidth) + 'px)')
      .css('display', 'inline-flex');
  } else if (swidth < minWidth) { // 隐藏菜单条，显示系统名称和菜单图标
    $$('#topnav').hide();
    $$('.sys-name').show();
    $$('.menu-icon').show();
  }
}

// 设置全局Context
function setGlobalContext(name, value) {
  if (!Template7.global) {
    Template7.global = {};
  }
  Template7.global[name] = value;
}

// clear按钮
function clearInput() {
  var $clicked = $$(this);
  var $inputEl = $clicked.siblings("input, textarea").eq(0);
  var previousValue = $inputEl.val();
  $inputEl
    .val("")
    .trigger("change")
    .focus()
    .trigger("input:clear", previousValue);
}

$$(document).on("change", "input[type='file']", function(e) {
  $$(e.target)
    .siblings("label")
    .html(e.target.files && e.target.files[0] && e.target.files[0].name || '');
});
