const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            font-family: sans-serif;
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            color: firebrick;
            margin: 0;
        }
        p {
            margin: 18px 0;
        }
    </style>
    <div class="container">
        <h1>What are some great animals?</h1>
        <p class="animal">Animal name here</p>
        <div>
            <button class="decrease"><</button>
            <button class="increase">></button>
        </div>
    </div>
    
`;

class TestComponent extends HTMLElement {
	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));

		this.animalName = this.shadowRoot.querySelector('.animal');
		this.increaseBtn = this._shadowRoot.querySelector('.increase');
		this.decreaseBtn = this._shadowRoot.querySelector('.decrease');
		this.dataArray = ['dolphin', 'ardvark', 'lynx', 'balooga'];
		this.globalIndex = 0;

		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.renderAnimalName = this.renderAnimalName.bind(this);
	}

	connectedCallback() {
		this.increaseBtn.addEventListener('click', this.increase);
		this.decreaseBtn.addEventListener('click', this.decrease);
		this.renderAnimalName();
	}

	renderAnimalName() {
		this.animalName.innerHTML = this.dataArray[this.globalIndex];
	}

	set setArray(value) {
		this.dataArray = value;
	}

	increase() {
		this.globalIndex = this.globalIndex + 1;

		if (this.globalIndex > this.dataArray.length - 1) {
			this.globalIndex = 0;
		}
		this.renderAnimalName();
	}

	decrease() {
		this.globalIndex = this.globalIndex - 1;

		if (this.globalIndex < 0) {
			this.globalIndex = this.dataArray.length - 1;
		}
		this.renderAnimalName();
	}
}

window.customElements.define('test-component', TestComponent);
