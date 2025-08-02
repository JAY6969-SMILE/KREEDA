

import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";  
import { calculateangle, distance, isABinYPlane } from "../../GlobalFunctions/calculateAngle";
 

let setAnimateBorder = false;

function VideoAndCanvasCTest(props) {
  function scoreIncreaseFun() {
    resultRef.current = !resultRef.current;
    sorecRef.current = sorecRef.current + 1;
    ScoreAudioCount();
    return;
  }

  let queue = useRef([false, false, false, false]);

  // const { exerlist, pointer, updatelist, restRef, resultRef, sorecRef, ScoreAudioCount, evaluate1, evaluate2, TimerVal, audioPlaying, time } = props;

  const exerlist = props.exerlist; 
  let pointer = props.pointer;
  const updatelist = props.updatelist;
  let restRef = props.restRef;
  let resultRef = props.resultRef;
  let sorecRef = props.sorecRef;
  const ScoreAudioCount = props.ScoreAudioCount;
  const evaluate1 = props.evaluate1;    // 
  const evaluate2 = props.evaluate2;   /// 
  const evaluate1ForSideCam = props.evaluate1ForSideCam;
  const evaluate2ForSideCam = props.evaluate2ForSideCam;
//   console.log("evaluate1 array:", evaluate1);
// console.log("evaluate2 array:", props.evaluate1[pointer.current-1]);
// console.log("pointer:", pointer);

  const TimerVal = props.TimerVal;
  let audioPlaying = props.audioPlaying;
  let time = props.time;


  const [animateBorder, setAnimateBorder] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const pose1 = useRef(null);
  const pose2 = useRef(null);
  let keypointsFront = []
  let keypointsSide = []

  // Function for setting up the glow effect based on success or failure
  const setupGlow = (parms) => {
    const canva1 = document.getElementById("ourcanva");
    setAnimateBorder(true);
    if (parms === "green") {
      canva1.style.boxShadow = "green -4px 4px 50px 50px";
      setTimeout(() => {
        setAnimateBorder(false);
        canva1.style.boxShadow = "rgb(91, 90, 90) -4px 4px 10px 5px";
      }, 10000);
    } else {
      canva1.style.boxShadow = "red -4px 4px 50px 50px";
      setTimeout(() => {
        setAnimateBorder(false);
        canva1.style.boxShadow = "rgb(91, 90, 90) -4px 4px 10px 5px";
      }, 2000);
    }
  };

  // Check body position (example for setup check)
  function setupCheck(keypointsFront, keypointsSide) { 
    // debugger
    console.log(keypointsFront[28] && keypointsSide[28]);
    
    if (keypointsFront[28] && keypointsSide[28]) {
      if (
        keypointsFront[28].visibility > 0.75 &&
        keypointsSide[28].visibility > 0.75 &&
        calculateangle(keypointsFront[14], keypointsFront[12], keypointsFront[24]) > 80 && 
        keypointsSide[14].y+2 > keypointsSide[12].y 
      ) {
        console.log("setup has completed now ");
        
        return true;
      }  
        return false;
    } 
  }

  // Action logic for checking body position and exercise movements
  function action(keypointsFront,keypointsSide) {
    // Step 1: Check Body Position for Setup
    if (exerlist[pointer.current] === "Setup") {
      let result =false;
      setTimeout(() => { 
        result = setupCheck(keypointsFront, keypointsSide);
        // console.log(keypointsFront);
        // debugger
      }, 5000);
      if (result) {
        TimerVal.current = 1;
        setupGlow("green", setAnimateBorder); // Proceed only if the setup is correct
        return;
      }
    }

    // Step 2: Body Position is Valid, Check for Exercise Movements
    if (updatelist[pointer.current][2]) {
      const instructAud = document.getElementById("instructorAudio");
      let flag = false;

      if (updatelist[pointer.current].length == 5) {
        if (updatelist[pointer.current][4].lying == 0) {
          flag = true; // For standing exercises
        } else if (updatelist[pointer.current][4].lying == 1) {
          // flag = isABinYPlane(keypoints[updatelist[pointer.current][4].pointA], keypoints[updatelist[pointer.current][4].pointB]);
        }
      } else {
        flag = true; // For exercises without special pose checks
      }

      // Step 3: Check if Movement is Correct
      if (flag) {
        // console.log(evaluate1 ,evaluate2);
        
        if (!queue.current[0] && evaluate1[pointer.current - 1](keypointsFront)) {
          if (!queue.current[2] && evaluate1ForSideCam[pointer.current - 1](keypointsSide)) {
            queue.current[0] = true;
            queue.current[2] = true;
          } 
        }

        if (queue.current[0] && evaluate2[pointer.current - 1](keypointsFront)) {
          if (queue.current[2] && evaluate2ForSideCam[pointer.current - 1](keypointsSide)) {
            queue.current[1] = true;
            queue.current[3] = true;
          }
        }

        // Step 4: Finalize Rep Count if Both Evaluations Passed
        if (queue.current[0] && queue.current[1] && queue.current[2] && queue.current[3]) {
          if (
            exerlist[pointer.current] === exerlist[1] ||
            exerlist[pointer.current] === exerlist[2] ||
            exerlist[pointer.current] === exerlist[3] ||
            exerlist[pointer.current] === exerlist[4] ||
            exerlist[pointer.current] === exerlist[5]
          ) {
            resultRef.current = true;
            scoreIncreaseFun();
          }
          queue.current[0] = false;
          queue.current[1] = false;
          queue.current[2] = false;
          queue.current[3] = false;
        }
      } else {
        // If the body position is invalid, show red glow and message
        setupGlow("red", setAnimateBorder);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 500);
        return;
      }
    }
  }

  // Draw Circle Function for Visualizing Keypoints
  function drawCircle(context, x, y, color, radius) {
    if (color == null) {
      color = "#FFF";
    }
    if (radius == null) {
      radius = 1;
    }
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
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

  const drawPoseResults = (results, canvasCtx, vidrNum) => {
    // console.log(vidrNum," and it's type ", typeof(vidrNum));
    
    canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      canvasCtx.drawImage(results.image,0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height); 
  
    if (results.poseLandmarks) {
      const keypoints = results.poseLandmarks.map((landmark) => ({
        x: landmark.x * canvasCtx.canvas.width, // edit according to vid and canva element 
        y: landmark.y * canvasCtx.canvas.height,
        z: landmark.z,
        visibility: landmark.visibility,
      }));

      // console.log(keypoints);
      
  
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
        if (vidrNum==="video1") {
          keypointsSide = [...keypoints]; //JSON.parse(JSON.stringify(keypoints));
          // console.log(keypointsSide); 
        }else if (vidrNum==="video2"){
          keypointsFront = [...keypoints]; //JSON.parse(JSON.stringify(keypoints));
          // console.log(keypointsFront); 
        } else {
          keypointsFront = [...keypoints]; //JSON.parse(JSON.stringify(keypoints));
          // console.log(keypointsFront);
        }
        console.log("\n\n", keypoints,"\n\n",keypointsFront,"\n\n" ,"\n\n",keypointsSide);
        
        action(keypointsFront,keypointsSide);
      }
    }
  
    canvasCtx.restore();
  };
  

  const setupPoseEstimation = (poseEstimator, videoElement, canvasElement,vidrNum) => {
    poseEstimator.onResults((results) => {
      const canvasCtx = canvasElement.getContext("2d");
      drawPoseResults(results, canvasCtx,vidrNum);
      // console.log(videoElement ,"video element \n\n\n\n/n/n");
      
    });

    const processVideoFrame = async () => {
      if (videoElement.readyState === 4) {
        await poseEstimator.send({ image: videoElement });
      }
      requestAnimationFrame(processVideoFrame);
    };
    processVideoFrame();
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
  }, [])
  

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

        setTimeout(() => {
          startVideoStream(videoRef1.current, cameras[0].deviceId, { width: 640, height: 480 })
          .then(() => setupPoseEstimation(pose1.current, videoRef1.current, canvasRef1.current,"video1"))
          .catch((err) => console.error("Camera 1 failed:", err));

        startVideoStream(videoRef2.current, cameras[1].deviceId, { width: 640, height: 480 })
          .then(() => setupPoseEstimation(pose2.current, videoRef2.current, canvasRef2.current,"video2"))
          .catch((err) => console.error("Camera 2 failed:", err));
        }, 5000);
      } else {
        console.error("Not enough cameras available.");
      }
    });
  }, []);

   

  return (
    <>
      <div style={styleinline.canVidMainC}>
        <div style={{...styleinline.canVidC ,zIndex: props.ZIndix1}} className="vidAndCanvaContainer">
          <video hidden="hidden" className="input_video5 bg-black" ref={videoRef1} style={styleinline.vidStyle} playsInline></video>
          <canvas className={`output5 ${animateBorder ? "animateBorder" : ""}`}  id="ourcanva" ref={canvasRef1} style={styleinline.canvas} width={1280} height={720}></canvas>
        </div>
        <div style={{...styleinline.canVidC ,zIndex: props.ZIndix2}} className="vidAndCanvaContainer">
          <video  hidden="hidden" className="input_video5 bg-black" ref={videoRef2} style={styleinline.vidStyle} playsInline></video>
          <canvas className={`output5 ${animateBorder ? "animateBorder" : ""}`} id="ourcanva" ref={canvasRef2} style={styleinline.canvas} width={1280} height={720}></canvas>
        </div>
      </div>
    </>
  );
}

export default VideoAndCanvasCTest;

const styleinline = {
  canvas: {
    width: "100%",
    height: "100%",
    boxShadow: "rgb(91, 90, 90) -4px 4px 10px 5px",
    borderRadius: "5px",
    position: "absolute",
    opacity : "0",
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