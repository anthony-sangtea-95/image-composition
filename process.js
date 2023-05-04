var fgImg=null;var bgImg=null;
function loadforegroundImage(){
var cv=document.getElementById("fgCan");
var file=document.getElementById("fgFile");
fgImg=new SimpleImage(file);
 fgImg.drawTo(cv);
}
function loadbackgroundImage(){
  var cv=document.getElementById("bgCan");
var file=document.getElementById("bgFile");
bgImg=new SimpleImage(file);
 bgImg.drawTo(cv);
}
function doGreenScreen(){
    if(fgImg==null || !fgImg.complete()){
      alert("Foreground Image not loaded...");
            return;
    }
  if(bgImg==null || !bgImg.complete()){
     alert("Background Image not loaded...");
            return;
    }
  clearCanvas();
  var outImg=new SimpleImage(fgImg.getWidth(),fgImg.getHeight());

for(var pixel of fgImg.values())
{
    var x=pixel.getX();
    var y=pixel.getY();
    
    var r=pixel.getRed();
    var g=pixel.getGreen();
    var b=pixel.getBlue();
    
    if(g==255)
    {
        var backImg=bgImg.getPixel(x,y);
        outImg.setPixel(x,y,backImg);
    }
    else
    {
        outImg.setPixel(x,y,pixel);  
    }
}
  var outCan=document.getElementById("fgCan");
  outImg.drawTo(outCan);
}
function clearCanvas(){
  var canFore=document.getElementById("fgCan");
  var  canBack=document.getElementById("bgCan");
  var foreContext=canFore.getContext("2d");
  var backContext=canBack.getContext("2d");
  foreContext.clearRect(0,0,canFore.width,canFore.height);
  backContext.clearRect(0,0,canBack.width,canBack.height);
}