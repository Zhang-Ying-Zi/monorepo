#import('dart:html');
#import('../../include/utilslib.dart', prefix:'utilslib');
#source('../classes/ball.dart');
#source('../classes/bound.dart');
#source('../classes/line.dart');

class anglebouncefinal {

  anglebouncefinal() {
  }

  void run() {
    CanvasElement canvas = document.query('#canvas');
    var context = canvas.getContext('2d');
    var mouse = utilslib.Utils.captureMouse(canvas);
    var ball = new Ball();
    var line = new Line.withParameters(0, 0, 200, 0);
    var gravity = 0.2,
        bounce = -0.6;
    
    ball.x = 100;
    ball.y = 100;

    line.x = 50;
    line.y = 200;
    
    drawFrame(int t) {
      document.window.webkitRequestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      var bounds = line.getBounds();
       //move line with mouse
      line.rotation = ((canvas.width / 2 - mouse.x) * 0.1) * Math.PI / 180;
      
      //normal motion code
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width) {
        //get angle, sine, and cosine
        var cos = Math.cos(line.rotation),
            sin = Math.sin(line.rotation),
            //get position of ball, relative to line
            x1 = ball.x - line.x,
            y1 = ball.y - line.y,
            //rotate coordinates
            y2 = cos * y1 - sin * x1;
            //rotate velocity
            var vy1 = cos * ball.vy - sin * ball.vx;
        //perform bounce with rotated values
        if (y2 > -ball.radius && y2 < vy1) {
          //rotate coordinates
          var x2 = cos * x1 + sin * y1,
              //rotate velocity
              vx1 = cos * ball.vx + sin * ball.vy;
          y2 = -ball.radius;
          vy1 *= bounce;
          //rotate everything back
          x1 = cos * x2 - sin * y2;
          y1 = cos * y2 + sin * x2;
          ball.vx = cos * vx1 - sin * vy1;
          ball.vy = cos * vy1 + sin * vx1;
          ball.x = line.x + x1;
          ball.y = line.y + y1;
        }
      }
      
      //bounce off ceiling, floor, and walls
      if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.vx *= bounce;
      } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx *= bounce;
      }
      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= bounce;
      } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= bounce;
      }
      
      ball.draw(context);
      line.draw(context);
    };
    drawFrame(0);
  }
}

void main() {
  new anglebouncefinal().run();
}
