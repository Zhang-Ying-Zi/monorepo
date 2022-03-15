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
  // 绘制圆角矩形
  function roundedRect(ctx, x, y, width, height, radius) {
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
  }

  function drawSpirograph(ctx, R, r, O) {
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
  }

  function drawStar(ctx, r) {
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
  }

  return {
    roundedRect,
    drawSpirograph,
    drawStar,
  };
});
