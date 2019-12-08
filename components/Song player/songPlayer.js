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

  _initPlayer() {
    this._createElements();
    this._setEventListeners();
  }

  _createElements() {
    this._createFileInput();
    this._createAudioPlayer();
  }

  _createFileInput() {
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'audio/*');
    this._parent.appendChild(fileInput);

    this._elements.fileInput = fileInput;
  }

  _setEventListeners() {
    this._setFileInputListener();
  }

  _setFileInputListener() {
    this._elements.fileInput.addEventListener('change', (event) => {
      this._songUrl = URL.createObjectURL(event.target.files[0]);
    });
  }

  _createAudioPlayer() {
    const audioPlayer = document.createElement('audio');

    audioPlayer.setAttribute('controls', true);
    this._parent.appendChild(audioPlayer);

    this._elements.audioPlayer = audioPlayer;
  }
}
