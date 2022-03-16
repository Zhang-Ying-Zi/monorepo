#import('dart:html');
#import('../../include/utilslib.dart', prefix:'utilslib');
#source('../classes/ball.dart');
#source('../classes/bound.dart');
#source('../classes/line.dart');

class multianglebounce {

  multianglebounce() {
  }

  void run() {
    CanvasElement canvas = document.query('#canvas');
    var context = canvas.getContext('2d');
    var mouse = utilslib.Utils.captureMouse(canvas);
    var ball = new Ball.withRadius(20);
    List<Line> lines = new List<Line>(5);
    var gravity = 0.2,
        bounce = -0.6;
    
    ball.x = 100;
    ball.y = 50;
    
    //create 5 lines, position and rotate
    lines[0] = new Line.withParameters(-50, 0, 50, 0);
    lines[0].x = 100;
    lines[0].y = 100;
    lines[0].rotation = 30 * Math.PI / 180;

    lines[1] = new Line.withParameters(-50, 0, 50, 0);
    lines[1].x = 100;
    lines[1].y = 200;
    lines[1].rotation = 45 * Math.PI / 180;

    lines[2] = new Line.withParameters(-50, 0, 50, 0);
    lines[2].x = 220;
    lines[2].y = 150;
    lines[2].rotation = -20 * Math.PI / 180;

    lines[3] = new Line.withParameters(-50, 0, 50, 0);
    lines[3].x = 150;
    lines[3].y = 330;
    lines[3].rotation = 10 * Math.PI / 180;

    lines[4] = new Line.withParameters(-50, 0, 50, 0);
    lines[4].x = 230;
    lines[4].y = 250;
    lines[4].rotation = -30 * Math.PI / 180;
    
    checkLine(var line) {
      var bounds = line.getBounds();

      if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width) {
        //get angle, sine, and cosine
        var cos = Math.cos(line.rotation),
            sin = Math.sin(line.rotation),
            //get position of ball, relative to line
            x1 = ball.x - line.x,
            y1 = ball.y - line.y,
            //rotate coordinates
            y2 = cos * y1 - sin * x1,
            //rotate velocity
            vy1 = cos * ball.vy - sin * ball.vx;
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
    };
    
    drawLine(var line) {
      checkLine(line);
      line.draw(context);
    };
    
    drawFrame(int t) {
      document.window.webkitRequestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      //normal motion code
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;
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
      lines.forEach(drawLine);
      ball.draw(context);
    };
    drawFrame(0);
  }
}

void main() {
  new multianglebounce().run();
}
