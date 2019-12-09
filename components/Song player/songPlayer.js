export default class SongPlayer {
  constructor(parent) {
    this._parent = parent;
    this._elements = {};

    this._initPlayer();

    this._songUrl = 'asserts/justin_bieber_ludacris_baby-namobilu.com.mp3';
  }

  set _songUrl(url) {
    this._elements.audioPlayer.setAttribute('src', url);
  }

  set playAction(action) {
    this._playAction = action;
  }

  set pauseAction(action) {
    this._pauseAction = action;
  }

  _initPlayer() {
    this._createElements();
    this._setEventListeners();
  }

  _createElements() {
    this._createFileInput();
    this._createAudioPlayer();
    this._createAudioAnalyser();
  }

  _createFileInput() {
    const fileInput = document.createElement('input');

    fileInput.style.display = 'block';
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'audio/*');
    this._parent.appendChild(fileInput);

    this._elements.fileInput = fileInput;
  }

  _createAudioPlayer() {
    const audioPlayer = document.createElement('audio');

    audioPlayer.style.display = 'block';
    audioPlayer.style.width = '100%';
    audioPlayer.setAttribute('controls', true);
    this._parent.appendChild(audioPlayer);

    this._elements.audioPlayer = audioPlayer;
  }

  _setEventListeners() {
    this._setFileInputListener();
    this._setAudioPlayerListener();
  }

  _setFileInputListener() {
    this._elements.fileInput.addEventListener('change', (event) => {
      this._songUrl = URL.createObjectURL(event.target.files[0]);
    });
  }

  _setAudioPlayerListener() {
    const  { audioPlayer, audioPlayer: { audioNode, analyser, dataArray } } = this._elements;

    audioNode.addEventListener('audioprocess', () => {
      const isPaused = audioPlayer.paused;
      
      if (!isPaused) {
        analyser.getByteFrequencyData(dataArray);

        this._playAction && this._playAction(dataArray);
      } else this._pauseAction();
    });
  }

  _createAudioAnalyser() {
    const audioContext = new AudioContext();
    const { audioPlayer } = this._elements;
    const mediaSource = audioContext.createMediaElementSource(audioPlayer);

    audioPlayer.audioNode = audioContext.createScriptProcessor(4096, 1, 1);
    audioPlayer.analyser = audioContext.createAnalyser();

    const { audioNode, analyser } = audioPlayer;

    analyser.fftSize = 512;
    audioPlayer.dataArray = new Uint8Array(analyser.frequencyBinCount);
  
    mediaSource.connect(analyser);
    analyser.connect(audioNode);
    mediaSource.connect(audioContext.destination);    
    audioNode.connect(audioContext.destination);
  }
}
