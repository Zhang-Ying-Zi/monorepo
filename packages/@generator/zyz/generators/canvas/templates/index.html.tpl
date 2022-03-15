<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" /> 
        <meta name="format-detection" content="email=no" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <title><%= templateName %></title>
        <style type="text/css">
            canvas { border: 1px solid #000000; }
        </style>
    </head>
    <body>

        <canvas id="canvas" width="500" height="500">You browser do not support canvas</canvas>
    
        <script type="text/javascript" src="./js/utils.js"></script>
        <script type="text/javascript">
            window.onload=function(){
                var canvas=document.getElementById("canvas");
                var ctx=canvas.getContext("2d");
                (function drawFrame(){
                    window.requestAnimationFrame(drawFrame);
                    ctx.clearRect(0,0,canvas.width,canvas.height);

                }());
            };
        </script>
    </body>
</html>