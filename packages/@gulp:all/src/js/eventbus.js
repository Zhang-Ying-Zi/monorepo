
// socket 注册
var eb = null;
var eventbusinterval = null;
var PAGEADDRS = new Object();
PAGEADDRS["door"] = new Array();
PAGEADDRS["area"] = new Array(); 

if (localStorage.xsbtoken) {
  reconnectEventBus();
}

// 道闸控制消息数据
window.gateData = {};

// 道闸控制 - 更新信息
function changeGatePanelData(parentId, gateItem) {
  var parent = $$(".gate-item[data-id='" + parentId + "']");
  if (gateItem) {
    parent
      .find(".gate-item-plate")
      .html("<div>缴费车辆：</div><div>" + gateItem.plate + "</div>");
    parent
      .find(".gate-item-fee")
      .html("<div>停车费用：</div><div>" + gateItem.fee + "元</div>");
    parent
      .find(".gate-item-starttime")
      .html("<div>开始计费时间：</div><div>" + gateItem.starttime + "</div>");

    if (gateItem.fee) {
      parent.find(".gatePayGo").removeClass("cantuse");
    } else {
      parent.find(".gatePayGo").addClass("cantuse");
    }
    return;
  }
  parent.find(".gate-item-plate").html("<div></div><div></div>");
  parent.find(".gate-item-fee").html("<div></div><div></div>");
  parent.find(".gate-item-starttime").html("<div></div><div></div>");
  parent.find(".gatePayGo").addClass("cantuse");
  
}

// 返回 00:00:00
function formatTime(endtime, starttime) {
  var hour = 00;
  var minute = 00;
  var second = 00;
  if (starttime && endtime) {
    var _time = Math.floor(
      (parseFloat(endtime) - parseFloat(starttime)) / 1000
    );
    second = _time % 60;
    _time = Math.floor(_time / 60);
    minute = _time % 60;
    _time = Math.floor(_time / 60);
    hour = _time;

    // for 微信PC浏览器
    second = second >= 0 ? second : 0;
    minute = minute >= 0 ? minute : 0;
    hour = hour >= 0 ? hour : 0;
  }
  second = second <= 9 ? "0" + second : second;
  minute = minute <= 9 ? "0" + minute : minute;
  hour = hour <= 9 ? "0" + hour : hour;
  return hour + ":" + minute + ":" + second;
}

function gateHandler(err, msg) {
  try {
    var body = JSON.parse(msg.body);
    console.log(body);
    
    if (body.plate) {
      // 检测到有车
      var gateDataItem = {
        dooraccesssn: body.dooraccesssn,
        ordersn: body.ordersn,
        plate: body.plate,
        fee: parseFloat(body.fee).toFixed(4) / 100,
        originfee: body.fee,
        starttime: new Date(body.starttime * 1000).format("yyyy-MM-dd hh:mm:ss"),
        endtime: new Date(body.endtime * 1000).format("yyyy-MM-dd hh:mm:ss"),
        duringtime: formatTime(body.endtime * 1000, body.starttime * 1000),
        url: body.url ? body.url : ""
      };
      
      window.gateData[body.dcid] = gateDataItem;
      // 道闸控制页面
      if (localStorage.currentUrl == "/control/gate") {
        changeGatePanelData(body.dcid, gateDataItem);
      } else {
        // 没有检测到车
        changeGatePanelData(body.dcid);
      }
    }
  } catch (e) {
    console.log(e);
  }
}


function reconnectEventBus() {
  var urlPrex = baseConfig.service.PRIX.substring(0, baseConfig.service.PRIX.length - 1);
  eb = new EventBus(urlPrex + "eventbus/", {
    vertxbus_ping_interval: 5000
  });
  eb.onopen = onEventBusOpen;
  eb.onclose = onEventBusClose;
}

function onEventBusClose() {
  if (eventbusinterval != null) clearInterval(eventbusinterval);
  eventbusinterval = setInterval(function() {
    if (eb.state == EventBus.OPEN || eb.state == EventBus.CONNECTING || !localStorage.xsbtoken) return;
    reconnectEventBus();
  }, 5000);
}

function onEventBusOpen() {
  if (eventbusinterval != null) clearInterval(eventbusinterval);
  for (var page in PAGEADDRS) {
    var addrs = PAGEADDRS[page];
    if (page == "door") {
      for (var i = 0; addrs != null && i < addrs.length; i++) {
        eb.registerHandler(addrs[i], gateHandler);
      }
    }
    if (page == "area") {
      for (var i = 0; addrs != null && i < addrs.length; i++) {
        eb.registerHandler(addrs[i], lotHandler);
      }
    }
  }
}

function registerDoorHandler(id) {
  if (!PAGEADDRS["door"].includes("DOORACCESS" + id)) {
    if (eb != null && eb.state == EventBus.OPEN) {
      eb.registerHandler("DOORACCESS" + id, gateHandler);
    }
    PAGEADDRS["door"].push("DOORACCESS" + id);
  }
}

function unregisterDoorHandler(id) {
  if (PAGEADDRS["door"].includes("DOORACCESS" + id)) {
    if (eb != null && eb.state == EventBus.OPEN) {
      eb.unregisterHandler("DOORACCESS" + id, gateHandler);
    }
    PAGEADDRS["door"].splice(PAGEADDRS["door"].indexOf("DOORACCESS" + id), 1);
  }
}

function lotHandler(err, msg) {
  try {
    var body = msg.body;
    console.log(msg);
    if (!localStorage.lotareaid) {
      return;
    }
    
    // 检测到有车位状态变化
    var lotdata = Array.isArray(body) ? body : [body];
    // 车位热力图
    var curareaid = msg.address.replace('LOTAREA', '');
    if (lotdata.length && location.href.indexOf('park-heat-map') !== -1 && $$('#area-' + curareaid).length) {
      lotdata.forEach(function(lot) {
        if (!lot.tag || !$$('rect[type="lot"][id="'+lot.tag+'"]').length) {
          return;
        }
        $$('rect[type="lot"][id="'+lot.tag+'"]').attr('fill', lot.car ? 'red' : FREE_CAR_COLOR);
      });
      var realfree = lotdata[lotdata.length - 1].free;
      $$('.free-car').text(realfree);

      // 实际和当前显示的空余车位不一致重新查询
      var curfree = $$('#svgShow rect[type="lot"][fill="'+FREE_CAR_COLOR+'"]').length;
      if (realfree !== curfree) {
        asyncV2Service('/map/listAreaLot', {type: 'I', areaid: curareaid}, function(pdata) {
          pdata.forEach(function(lot) {
            if ($$('rect[type="lot"][id="'+lot.tag+'"]')) {
              $$('rect[type="lot"][id="'+lot.tag+'"]').attr('fill', lot.car ? 'red' : FREE_CAR_COLOR);
            }
          });
        });
      }
      $$('text[type="freenum"]').remove();
      $$('rect[type="freenum"]').remove();
      return;
    }

    // 车位列表查看
    if (lotdata.length) {
      lotdata.forEach(function(lot) {
        if (!lot.tag) {
          return;
        }
        var cname = lot.cname || $$('#name-'+ lot.tag).html() || '';
        var rsrp = (lot.rsrp || 0).toFixed(2) - 0;
        var sinr = (lot.sinr || 0).toFixed(2) - 0;
        var ptime = lot.ptime && new Date(lot.ptime * 1000).format('MM-dd hh:mm:ss') || '';
        var imgurl = lot.car ? 'img/park_occupy.svg' : 'img/park_free.svg';
        var newContent  = '<div class="border-item-staus">\
            <img src="'+imgurl+'" class="lot-img" width="22" height="22">\
            <span id="name-'+lot.tag+'">'+cname+'</span></div>\
          <div class="board-item-content">\
            <div class="row"><div class="col-35">信号强度：</div><div class="col-65">'+rsrp+'</div></div>\
            <div class="row"><div class="col-35">信噪比：</div><div class="col-65">'+sinr+'</div></div>\
            <div class="row"><div class="col-35">停稳时间：</div><div class="col-65">'+ptime+'</div></div>\
          </div>';
      
        if ($$('.lot-'+ lot.tag).length) { // 存在的
          $$('.lot-'+ lot.tag).html(newContent);
        } else {
          var newItem = '<div class="board-item lot-'+lot.tag+'">'+newContent+'</div>';
          $('#parklot').append(newItem);
        }
      });
      // 更新当前泊位精灵空车位
      $$('.jl-free-lot').text('剩余空车位:' + lotdata[lotdata.length - 1].free);
    }
  } catch (e) {
    console.log(e);
  }
}

function registerLotHander(id) {
  if (!PAGEADDRS["area"].includes("LOTAREA" + id)) {
    if (eb != null && eb.state == EventBus.OPEN) {
      eb.registerHandler("LOTAREA" + id, lotHandler);
    }
    PAGEADDRS["area"].push("LOTAREA" + id);
  }
}

function unregisterLotHander(id) {
  if (PAGEADDRS["area"].includes("LOTAREA" + id)) {
    if (eb != null && eb.state == EventBus.OPEN) {
      eb.unregisterHandler("LOTAREA" + id, lotHandler);
    }
    PAGEADDRS["area"].splice(PAGEADDRS["area"].indexOf("LOTAREA" + id), 1);
  }
}
