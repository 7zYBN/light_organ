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
    const { arrow, label, options } = this._elements;

    arrow.classList.remove('rotate-back');
    arrow.classList.add('rotate');

    label.classList.add('special-style');

    if (!options.hasChildNodes()) {
      this._createOptions();
    }

    options.classList.add('show');
  }

  _closeDropDown(event) {
    const { container, selectorField, label, arrow, options } = this._elements;

    if (!container.contains(event.target)) {
      options.classList.remove('show');

      if (!selectorField.hasChildNodes()) {
        label.classList.remove('special-style');
      }
      
      if (arrow.classList.contains('rotate')) {
        arrow.classList.remove('rotate');
        arrow.classList.add('rotate-back');
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
    const { label , selectorField } = this._elements;

    options.forEach(option => {
      option.classList.remove('selected');
    });

    target.classList.add('selected');
    label.classList.add('selected');
    label.classList.add('special-style');
    selectorField.innerHTML = target.innerHTML;
    this.onSelect(getComputedStyle(target).backgroundColor);

    this._closeDropDown(event);
  }
}