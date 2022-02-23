/* eslint-disable no-unused-vars */
// 获取某个月的总天数
function getDaysOfMonth(year, month) {
  var date = new Date(year, month, 0);
  var days = date.getDate();
  return days;
}

//获取当前月份的总天数
function getDays() {
  var date = new Date();
  //将当前月份加1，下移到下一个月
  date.setMonth(date.getMonth() + 1);
  //将当前的日期置为0，
  date.setDate(0);
  //再获取天数即取上个月的最后一天的天数
  var days = date.getDate();
  return days;
}

Date.prototype.format = function (fmt) {
  var o = {
    "m+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "i+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
