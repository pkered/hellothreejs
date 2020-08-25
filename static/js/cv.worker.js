function waitForOpencv(callbackFn, waitTimeMs = 30000, stepTimeMs = 100) {
  if (cv.Mat) callbackFn(true);
  let timeSpentMs = 0;
  const interval = setInterval(() => {
    const limitReached = timeSpentMs > waitTimeMs
    if ( cv.Mat || limitReached ) {
      clearInterval(interval);
      return callbackFn(!limitReached);
    } else {
      timeSpentMs += stepTimeMs;
    }
  }, stepTimeMs );
}

onmessage = function(e) {
  switch (e.data.msg) {
    case 'load': {
      // self.importScripts('./opencv.js');
      self.importScripts('./opencv_3_4_custom_O3.js');
      waitForOpencv(success => {
        if(success) postMessage({ msg: e.data.msg })
        else throw new Error ('Error on loading OpenCV')
      });
      break;
    }
    case 'greyscale': {
      return greyscaleVideo(e.data)
    }
    default:
      break;
  }
}

function greyscaleVideo({ msg, payload }) {
  
}