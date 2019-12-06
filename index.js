window.onload = function() {
  
  const audio = document.getElementById("audio");

  const context = new AudioContext();
  const src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  const canvas = document.getElementById("canvas");
  canvas.width = 970;
  canvas.height = 550;
  const ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 512;

  const bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  const dataArray = new Uint8Array(bufferLength);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const squareSize = 50;

  const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

  const gap = 10;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    let startX = 0;
    let startY = 0;

    for (let i = 0; i < 144; i++) {
      // console.log(dataArray[i])
      // const color = COLORS[Math.floor(Math.random() * 7)];
      const r = dataArray[i] + (Math.floor(Math.random() * 256) * (i/bufferLength));
      const g = (Math.floor(Math.random() * 256) - 50 + dataArray[i]) * (i/bufferLength);
      const b = dataArray[i] + (i/bufferLength);
      
      if ((i % 16 === 0) && (i !== 0)) {
        startY += squareSize + gap;
        startX = 0;
      }
      // console.log(startX,startY)
      // ctx.fillStyle = color;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(startX + gap, startY + gap, squareSize, squareSize);
      startX += squareSize + gap;
    }
  }

  renderFrame();
};