export default class DropDown {
  constructor({selector = 'body', label = 'Select Item', options = ['Item1'], onSelect = () => alert('Hi')}) {
    this.selector = selector;
    this.label = label;
    this.options = options;
    this.onSelect = onSelect;

    this._elements = {};

    this._buildDropDown();
  }

  _buildDropDown() {
    document.querySelector(this.selector).innerHTML = '';
    this._createTemplate();
    this.setSelectorEvents();
  }

  _createTemplate() {
    this._createSelectorContainer();
    this._createSelectorLabel();
    this._createSelectorField();
    this._createArrowImage();
    this._createOptionsContainer();
  }

  setSelectorEvents() {
    this._elements.container.onclick = this._openDropDown.bind(this);
    document.onclick = this._closeDropDown.bind(this);
  }

  _createSelectorContainer() {
    const container = document.createElement('div');
    const parent = document.querySelector(this.selector);

    container.classList.add('selector-container');
    parent.appendChild(container);

    this._elements.container = container;
  }

  _createSelectorLabel() {
    const label = document.createElement('label');
    const parent = this._elements.container;

    label.classList.add('label');
    label.setAttribute('for', parent);
    label.innerHTML = this.label;
    parent.appendChild(label);

    this._elements.label = label;
  }

  _createSelectorField() {
    const selectorField = document.createElement('div');
    const parent = this._elements.container;

    selectorField.classList.add('selectorField');
    parent.appendChild(selectorField);

    this._elements.selectorField = selectorField;
  }

  _createArrowImage() {
    const arrow = document.createElement('img');
    const parent = this._elements.container;

    arrow.setAttribute('src', './components/dropdown/arrow.svg');
    parent.appendChild(arrow);

    this._elements.arrow = arrow;
  }

  _createOptionsContainer() {
    const options = document.createElement('div');
    const parent = document.querySelector(this.selector);

    options.classList.add('options');
    parent.appendChild(options);

    this._elements.options = options;
  }

  _openDropDown() {
    this._elements.arrow.classList.remove('rotate-back');
    this._elements.arrow.classList.add('rotate');

    this._elements.label.classList.add('special-style');

    if (!this._elements.options.hasChildNodes()) {
      this._createOptions();
    }

    this._elements.options.classList.add('show');
  }

  _closeDropDown(event) {
    if (!this._elements.container.contains(event.target)) {
      this._elements.options.classList.remove('show');

      if (!this._elements.selectorField.hasChildNodes()) {
        this._elements.label.classList.remove('special-style');
      }
      
      if (this._elements.arrow.classList.contains('rotate')) {
        this._elements.arrow.classList.remove('rotate');
        this._elements.arrow.classList.add('rotate-back');
      }
    }
  }

  _createOptions() {
    this.options.forEach(option => {
      this._createOneOption(option);
    })
  }

  _createOneOption(text) {
    const option = document.createElement('div');

    option.classList.add('options-item');
    option.innerHTML = text;
    option.style.background = text;
    this._elements.options.appendChild(option);

    option.onclick = this._optionClickHandle.bind(this, option);
  }

  _optionClickHandle(target) {
    const options = [...this._elements.options.children];
    options.forEach(option => {
      option.classList.remove('selected');
    });

    target.classList.add('selected');
    this._elements.label.classList.add('selected');
    this._elements.label.classList.add('special-style');
    this._elements.selectorField.innerHTML = target.innerHTML;
    this.onSelect(getComputedStyle(target).backgroundColor);

    this._closeDropDown(event);
  }
}