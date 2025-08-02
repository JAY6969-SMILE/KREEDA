import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import gsap from "gsap";
import { calculateangle, distance, isABinYPlane } from "../../GlobalFunctions/calculateAngle";  
// import {exerciseCorrection} from "./ErrorCorrectionLibrary";
import setupGlow from "../../GlobalFunctions/setupGlow";
import TranslucentMessage from "./TranslucentMessage";
let setAnimateBorder = false;														
							 

function VideoAndCanvasCTest_combined(props) {
  console.log(props);
  
  function sccoreInreaseFun() {
    // debugger;
    resultRef.current = !resultRef.current;
    sorecRef.current = sorecRef.current + 1;
    ScoreAudioCount();
    return;
  }
  let queue = useRef([false, false, false, false]); 

  const exerlist = props.exerlist; 
  let pointer = props.pointer;
  const updatelist = props.updatelist;
  let restRef = props.restRef;
  let resultRef = props.resultRef;
  let sorecRef = props.sorecRef;
  const ScoreAudioCount = props.ScoreAudioCount;
  const evaluate1 = props.evaluate1;    // 
  const evaluate2 = props.evaluate2 ;   /// 
//   console.log("evaluate1 array:", evaluate1);
// console.log("evaluate2 array:", props.evaluate1[pointer.current-1]);
// console.log("pointer:", pointer);

  const TimerVal = props.TimerVal;
  let audioPlaying = props.audioPlaying;
  let time = props.time;

    const [animateBorder, setAnimateBorder] = useState(false);
    

  const setupGlow = (parms) => {
    const canva1 = document.getElementById("ourcanva"); 
    setAnimateBorder(true);
    if (parms === "green") {
        canva1.style.boxShadow = "green -4px 4px 50px 50px";
        setTimeout(() => {
          setAnimateBorder(false);
          canva1.style.boxShadow = "rgb(91, 90, 90) -4px 4px 10px 5px";
        }, 10000);
    }else{
      canva1.style.boxShadow = "red -4px 4px 50px 50px";
        setTimeout(() => {
          setAnimateBorder(false);
          canva1.style.boxShadow = "rgb(91, 90, 90) -4px 4px 10px 5px";
        }, 2000);
    }
     
  }; 
    
  const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const canvasRef1 = useRef(null);
    const canvasRef2 = useRef(null);
    const pose1 = useRef(null);
    const pose2 = useRef(null);

  function setupCheck(att) {
    // console.log(`\n\n\n\n\n ${att[28].visibility > 0.75}   \n\n\n\n\n`);
    if (
      att[28].visibility > 0.75 &&
      calculateangle(att[14], att[12], att[24]) > 150
    ) {
      return true;
    }
    return false;
  }
 
  const [showMessage, setShowMessage] = useState(false);
  // let showMessage = false;
  function action(keypoints) {
    if (exerlist[pointer.current] === "Setup") { 
      const result = setupCheck(keypoints);
      if (result) { 
        TimerVal.current = 1; 
        setupGlow("green", setAnimateBorder); // ------7
        return;
      } 
    }
    if (updatelist[pointer.current][2]) {
      // debugger; 
      const instructAud = document.getElementById("instructorAudio");
      let flag = false;
      // console.log(instructAud); 
      // console.log(updatelist[pointer.current][4]);
      if(updatelist[pointer.current].length == 5){
        if(updatelist[pointer.current][4].lying == 0){
          flag = true;
        } else if(updatelist[pointer.current][4].lying == 1) {
          flag = isABinYPlane(keypoints[updatelist[pointer.current][4].pointA], keypoints[updatelist[pointer.current][4].pointB]);
        }
      } else {
        flag = true;
      }
      if(flag){
        // exerciseCorrection(keypoints , exerlist[pointer.current] ,instructAud);
        // console.log(keypoints);
        if (!queue.current[0] && evaluate1[pointer.current-1](keypoints)) {
          queue.current[0] = true;
        }
        if (queue.current[0] && evaluate2[pointer.current-1](keypoints)) {
          queue.current[1] = true;
        }
        if (queue.current[0] && queue.current[1]) {
          if (exerlist[pointer.current] === exerlist[1]) {
            resultRef.current = true;

            sccoreInreaseFun();
          }
          if (exerlist[pointer.current] === exerlist[2]) {
            resultRef.current = true;

            sccoreInreaseFun();
          }
          if (exerlist[pointer.current] === exerlist[3]) { 
            resultRef.current = true;
            sccoreInreaseFun();
          }
          if (exerlist[pointer.current] === exerlist[4]) { 
            resultRef.current = true;
            sccoreInreaseFun();
          }
          if (exerlist[pointer.current] === exerlist[5]) { 
            resultRef.current = true;
            sccoreInreaseFun();
          }
          queue.current[0] = false;
          queue.current[1] = false;
        }
      } else {
        setupGlow("red", setAnimateBorder);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 500);
        return;
      }
    } else {
      // console.log("I am at action");
    }
  }

  function drawCircle(context, x, y, color, radius) {
    if (color == null) {
      color = "#FFF";
    }
    if (radius == null) {
      radius = 1;
    }
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); // Draw a circle path
    context.fillStyle = color;
    context.fill();
    context.closePath();
    }

    
    const startVideoStream = async (videoElement, deviceId, constraints) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId }, ...constraints },
          });
    
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.onloadedmetadata = () => {
              setTimeout(() => {
                videoElement.play().catch((err) => console.error("Error playing video:", err));
              }, 500);
            };
          }
        } catch (error) {
          console.error("Error starting video stream:", error);
        }
      };  
  
  let currentTimeValu = time.current;
  let previous = time.current;
 
  useEffect(() => {
    // let timeinterval =
      setInterval(() => {
      let currentVal = time.current; 
      if (previous !== currentVal) {
        previous = currentVal; 
        currentTimeValu = currentVal;
        // console.log(currentTimeValu); 
      }
    }, 10);

    // return () => clearInterval(timeinterval);
  },[])

   
  const drawPoseResults = (results, canvasCtx) => {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  
    if (results.poseLandmarks) {
      const keypoints = results.poseLandmarks.map((landmark) => ({
        x: landmark.x * canvasCtx.canvas.width,
        y: landmark.y * canvasCtx.canvas.height,
        visibility: landmark.visibility,
      }));
  
      // Define keypoint connections (common body landmarks)
      const keypointPairs = [
        [11, 13], [13, 15], // Left arm (shoulder to elbow, elbow to wrist)
        [12, 14], [14, 16], // Right arm (shoulder to elbow, elbow to wrist)
        [11, 12], // Shoulders
        [23, 24], // Hips
        [11, 23], [12, 24], // Torso (shoulder to hip)
        [23, 25], [25, 27], // Left leg (hip to knee, knee to ankle)
        [24, 26], [26, 28]  // Right leg (hip to knee, knee to ankle)
      ];
  
      // Draw lines between connected keypoints
      canvasCtx.strokeStyle = "white";
      canvasCtx.lineWidth = 4;
      
      keypointPairs.forEach(([start, end]) => {
        if (keypoints[start].visibility > 0.75 && keypoints[end].visibility > 0.75) {
          canvasCtx.beginPath();
          canvasCtx.moveTo(keypoints[start].x, keypoints[start].y);
          canvasCtx.lineTo(keypoints[end].x, keypoints[end].y);
          canvasCtx.stroke();
        }
      });
  
      // Draw circles for each keypoint
      keypoints.forEach(({ x, y, visibility }) => {
        if (visibility > 0.75) {
          drawCircle(canvasCtx, x, y, "green", 6);
        }
      });
  
      // Call action function for rep counting
      if (keypoints[24].visibility > 0.75 && !restRef.current) {
        action(keypoints);
      }
    }
  
    canvasCtx.restore();
  };
  

  const setupPoseEstimation = (poseEstimator, videoElement, canvasElement) => {
    poseEstimator.onResults((results) => {
      const canvasCtx = canvasElement.getContext("2d");
      drawPoseResults(results, canvasCtx);
    });

    const processVideoFrame = async () => {
      if (videoElement.readyState === 4) {
        await poseEstimator.send({ image: videoElement });
      }
      requestAnimationFrame(processVideoFrame);
    };
    processVideoFrame();
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      if (cameras.length >= 2) {
        pose1.current = new Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        pose1.current.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        pose2.current = new Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        pose2.current.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        startVideoStream(videoRef1.current, cameras[0].deviceId, { width: 640, height: 480 })
          .then(() => setupPoseEstimation(pose1.current, videoRef1.current, canvasRef1.current))
          .catch((err) => console.error("Camera 1 failed:", err));

        startVideoStream(videoRef2.current, cameras[1].deviceId, { width: 320, height: 240 })
          .then(() => setupPoseEstimation(pose2.current, videoRef2.current, canvasRef2.current))
          .catch((err) => console.error("Camera 2 failed:", err));
      } else {
        console.error("Not enough cameras available.");
      }
    });
  }, []);

  useEffect(() => {
    const element = document.getElementById("ourcanva1");
    if (element) {
      gsap.to(element, { opacity: 1, duration: 1 });
    }
  }, []);

    
    
  return (
    <>
      <div style={styleinline.canVidMainC}>
        <div style={{...styleinline.canVidC ,zIndex: props.ZIndix1}}>
          <video ref={videoRef1} style={styleinline.vidStyle} autoPlay playsInline></video>
          <canvas id="ourcanva1" ref={canvasRef1} style={styleinline.canvas} width={1280} height={720}></canvas>
        </div>
        <div style={{...styleinline.canVidC ,zIndex: props.ZIndix2}}>
          <video ref={videoRef2} style={styleinline.vidStyle} autoPlay playsInline></video>
          <canvas id="ourcanva2" ref={canvasRef2} style={styleinline.canvas} width={1280} height={720}></canvas>
        </div>
      </div>
    </>
  );
  
}

export default VideoAndCanvasCTest_combined;

const styleinline = {
    canvas: {
      width: "100%",
      height: "100%",
      boxShadow: "rgb(91, 90, 90) -4px 4px 10px 5px",
      borderRadius: "5px",
      position: "absolute",
    },
    canVidC: {
      width: "70%", // Increased width
      height: "70%", // Decreased height
      borderRadius: "10px",
      position: "absolute",
      margin: "10px",  
      transform: "scaleX(-1)",
    },
    canVidMainC: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column", // Align vertically
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      gap: "20px",
      marginLeft: "25%", // Move the container slightly to the right center
      marginRight: "-5%", // Adjust right margin for balanced spacing 
      position: "relative",
    },
    vidStyle: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "0",
      top: "0",
      objectFit: "cover",
      // display: "none",
    },
};
