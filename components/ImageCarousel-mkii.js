const template2 = document.createElement('template');
template2.innerHTML = `
    <style>
        .img-carousel {
            display: flex;
            height: 100%;
        }

        button {
            background: transparent;
            border: none;
        }

        button:hover {
            color: gray;
        }

        .img-grid {
            flex: 1;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            width: 100%;
            height: 100%;
        }

        .img-1 {
            grid-column: 1 / -1;
            grid-row: 1 / 4;
            // background: darkslateblue;
        }

        .img-2, .img-3, .img-4 {
            grid-row-end: -1;
        }


    </style>
    <div class="img-carousel">
        <button class="decreaseBtn"><</button>
        <div class="img-grid">
            <div class="img img-1"></div>
            <div class="img img-2"></div>
            <div class="img img-3"></div>
            <div class="img img-4"></div>
        </div>
        <button class="increaseBtn">></button>
    </div>
`;

class ImageCarouselmkii extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.appendChild(template2.content.cloneNode(true));

		this.increaseBtn = this.shadow.querySelector('.increaseBtn');
		this.decreaseBtn = this.shadow.querySelector('.decreaseBtn');
		this.img1 = this.shadow.querySelector('.img-1');
		this.img2 = this.shadow.querySelector('.img-2');
		this.img3 = this.shadow.querySelector('.img-3');
		this.img4 = this.shadow.querySelector('.img-4');
		this.colorArray = [];
	}

	connectedCallback() {
		this.increaseBtn.addEventListener('click', this.increaseBtnHandler);
		this.decreaseBtn.addEventListener('click', this.decreaseBtnHandler);
		this.colorArray = JSON.parse(this.dataset.colorarray);
		this.renderImages();
	}

	renderImages() {
		this.img1.style.background = this.colorArray[0];
		this.img2.style.background = this.colorArray[1];
		this.img3.style.background = this.colorArray[2];
		this.img4.style.background = this.colorArray[3];
	}

	increaseBtnHandler = () => {
		const color = this.colorArray.shift();
		this.colorArray.push(color);

		console.log(this.colorArray);

		this.renderImages();
	};

	decreaseBtnHandler = () => {
		const color = this.colorArray.pop();
		this.colorArray.splice(0, 0, color);

		console.log(this.colorArray);

		this.renderImages();
	};
}

window.customElements.define('image-carousel-mkii', ImageCarouselmkii);
