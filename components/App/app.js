import Canvas from '../Canvas/canvas.js';
import SongPlayer from '../Song player/songPlayer.js';

export default class App {
  constructor() {

  }

  build() {
    this._buildCanvas();
    this._buildSongPlayer();
  }

  _buildCanvas() {
    const width = 970,
      height = 550;
    this._canvas = new Canvas(document.body, { width, height });
    this._canvas.drawRectangle('#000');
  }

  _buildSongPlayer() {
    this._songPlayer = new SongPlayer(document.body);

    this._songPlayer.playAction = (data) => {
      console.log(data)
      const squareSize = 50;
      const gap = 10;
      let startX = 0;
      let startY = 0;

      for (let i = 0; i < 144; i++) {
        // console.log(dataArray[i])
        // const color = COLORS[Math.floor(Math.random() * 7)];
        const r = data[i] + (Math.floor(Math.random() * 256) * (i/256));
        const g = (Math.floor(Math.random() * 256) - 50 + data[i]) * (i/256);
        const b = data[i] + (i/256);
        
        if ((i % 16 === 0) && (i !== 0)) {
          startY += squareSize + gap;
          startX = 0;
        }
        // console.log(startX,startY)
        // ctx.fillStyle = color;
        
        const color = "rgb(" + r + "," + g + "," + b + ")";
        this._canvas.drawRectangle(color, startX + gap, startY + gap, squareSize, squareSize);
        startX += squareSize + gap;
      }
    }    
  }
}

// window.onload = function() {
  
  
  
//   const audio = document.getElementById("audio");

//   const context = new AudioContext();
//   const src = context.createMediaElementSource(audio);
//   const analyser = context.createAnalyser();

//   src.connect(analyser);
//   analyser.connect(context.destination);

//   analyser.fftSize = 512;

//   const bufferLength = analyser.frequencyBinCount;
//   console.log(bufferLength);

//   const dataArray = new Uint8Array(bufferLength);

//   const WIDTH = canvas.width;
//   const HEIGHT = canvas.height;

//   const squareSize = 50;

//   const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

//   const gap = 10;

//   function renderFrame() {
//     requestAnimationFrame(renderFrame);

//     analyser.getByteFrequencyData(dataArray);

//     ctx.fillStyle = "#000";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);
//     let startX = 0;
//     let startY = 0;

//     for (let i = 0; i < 144; i++) {
//       // console.log(dataArray[i])
//       // const color = COLORS[Math.floor(Math.random() * 7)];
//       const r = dataArray[i] + (Math.floor(Math.random() * 256) * (i/bufferLength));
//       const g = (Math.floor(Math.random() * 256) - 50 + dataArray[i]) * (i/bufferLength);
//       const b = dataArray[i] + (i/bufferLength);
      
//       if ((i % 16 === 0) && (i !== 0)) {
//         startY += squareSize + gap;
//         startX = 0;
//       }
//       // console.log(startX,startY)
//       // ctx.fillStyle = color;
//       ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//       ctx.fillRect(startX + gap, startY + gap, squareSize, squareSize);
//       startX += squareSize + gap;
//     }
//   }

//   renderFrame();
// };
