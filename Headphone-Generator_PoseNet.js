// This demonstrates the use of ml5js to draw shapes over the face or body
// The completed version is here:
//  - https://editor.p5js.org/jonfroehlich/sketches/nbHJQJlAd
//
// This sketch is loosely based this "Hour of Code" Coding Train video 
// by Daniel Shiffman: https://youtu.be/EA3-k9mnLHs
//
// This Sketch uses ml5js, a Machine Learning JavaScript library that
// works well with p5js. ml5js provides lots of interesting methods
// including pitch detection, human pose detection, sound classification, etc.
// Read more here: https://ml5js.org/
//
// Specifically, we use ml5js's PoseNet implementation for human pose tracking.
//
// Reference for the ml5js PoseNet implementation:
//  - https://ml5js.org/reference/api-PoseNet/
//
// Primary PoseNet library, which ml5js is using under the hood:
//  - Read this article: "Real-time Human Pose Estimation in the Browser with TensorFlow.js"
//    here: https://link.medium.com/7EBfMICUh2
//  - https://github.com/tensorflow/tfjs-models/tree/master/posenet
//
// Other ML JavaScript APIs:
//  - Face Rec: https://github.com/justadudewhohacks/face-api.js/
// 
// By Jon E. Froehlich
// http://makeabilitylab.io/

let video;
let poseNet;
let human = null;

var img,faceWidth;
var LeftEarX, LeftEarY, RightEarX, RightEarY;
 
function preload()
{
  // load images
  img = loadImage("images/earphone.png");
}
 
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // setup PoseNet. This can take a while, so we load it 
  // asynchronously (when it's done, it will call modelReady)
  poseNet = ml5.poseNet(video, onPoseNetModelReady); //call onModelReady when setup
  poseNet.on('pose', onPoseDetected); // call onPoseDetected when pose detected
}


function onPoseNetModelReady() {
  print("The PoseNet model is ready...");
}

function onPoseDetected(poses) {
  // poses can contain an array of bodies (because PoseNet supports
  // recognition for *multiple* human bodies at the same time
  // however, for this demo, we are interested in only one human body
  // which is at poses[0]
  human = poses[0];
}

function draw() {
  image(video, 0, 0); // draw the video to screen
  noStroke(); // turn off drawing outlines of shapes

  //if a human has been detected, draw overlay shapes!
  if (human != null) {
    LeftEarX=human.pose.leftEar.x;
    LeftEarY=human.pose.leftEar.y;
    RightEarX=human.pose.rightEar.x;
    RightEarY=human.pose.rightEar.y;
    keyPressed();
  }
}

function keyPressed(){
  if (key == 2 )
  {
    drawEarphone();
    print("entered 2");
  } 
  else if(keyCode == DELETE )
  {
    image(video, 0, 0); 
    print("entered Delete");
  } 
  
}

function drawEarphone()
{
    //lx,ly,rx,ry
  //LeftEarX, LeftEarY, RightEarX, RightEarY
    faceWidth=LeftEarX-RightEarX;
    y=(LeftEarY+RightEarY)/2;
    img_x= (LeftEarX - faceWidth);
    img_y= y-(faceWidth);
    image(img, img_x-35, img_y, faceWidth+70,faceWidth+50); 
  
}


