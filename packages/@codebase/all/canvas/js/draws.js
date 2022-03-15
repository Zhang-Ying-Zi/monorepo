/* eslint-disable */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return (root.draws = factory());
    });
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.draws = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  var draws = {};
  // 圆角矩形
  draws.roundedRect = function (ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
  };

  draws.drawSpirograph = function (ctx, R, r, O) {
    var x1 = R - O;
    var y1 = 0;
    var i = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    do {
      if (i > 20000) break;
      var x2 =
        (R + r) * Math.cos((i * Math.PI) / 72) -
        (r + O) * Math.cos(((R + r) / r) * ((i * Math.PI) / 72));
      var y2 =
        (R + r) * Math.sin((i * Math.PI) / 72) -
        (r + O) * Math.sin(((R + r) / r) * ((i * Math.PI) / 72));
      ctx.lineTo(x2, y2);
      x1 = x2;
      y1 = y2;
      i++;
    } while (x2 != R - O && y2 != 0);
    ctx.stroke();
  };

  draws.drawStar = function (ctx, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 == 0) {
        ctx.lineTo((r / 0.525731) * 0.200811, 0);
      } else {
        ctx.lineTo(r, 0);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // 行军蚁
  draws.dynamicStrokeLine = function (ctx, startX, startY, width, height) {
    var offset = 0;
    function drawRect() {
      ctx.clearRect(startX, startY, width, height);
      ctx.setLineDash([4, 2]);
      ctx.lineDashOffset = -offset;
      ctx.strokeRect(startX, startY, width, height);
    }
    function march() {
      offset++;
      if (offset > 16) {
        offset = 0;
      }
      drawRect();
      setTimeout(march, 40);
    }
    march();
  };

  draws.smileFace = function (ctx) {
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // 顺时针
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();
  };

  return draws;
});
