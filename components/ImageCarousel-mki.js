const template1 = document.createElement('template');
template1.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .carousel {
            display: flex;
            justify-content: center;
            height: 100%;
            width: 100%;
            margin: 15px;
        }

        .carousel__img {
            height: 250px;
            width: 200px;
            margin: 0 10px;
            outline: 1px solid green;
        }

        .carousel__img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
    <div class='container'>
        <p>Image Carousel mki</p>

        <div class='carousel'>
            <button class='decrease-btn'><</button>
            <div class='carousel__img'>
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="" />
            </div>
            <button class='increase-btn'>></button>
        </div>
    </div>
`;

class ImageCarouselmki extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.appendChild(template1.content.cloneNode(true));

		this.increaseBtn = this.shadow.querySelector('.increase-btn');
		this.decreaseBtn = this.shadow.querySelector('.decrease-btn');
		this.image = this.shadow.querySelector('.carousel__img img');
		this.imageArray = [];
		this.globalIndex = 0;

		this.increaseImg = this.increaseImg.bind(this);
		this.decreaseImg = this.decreaseImg.bind(this);
		this.renderImage = this.renderImage.bind(this);
	}

	connectedCallback() {
		this.imageArray = JSON.parse(this.dataset.imagearray);
		this.increaseBtn.addEventListener('click', this.increaseImg);
		this.decreaseBtn.addEventListener('click', this.decreaseImg);
		this.renderImage();
	}

	renderImage() {
		this.image.src = this.imageArray[this.globalIndex];
	}

	increaseImg() {
		this.globalIndex = this.globalIndex + 1;

		if (this.globalIndex > this.imageArray.length - 1) {
			this.globalIndex = 0;
		}

		this.renderImage();
	}

	decreaseImg() {
		this.globalIndex = this.globalIndex - 1;

		if (this.globalIndex < 0) {
			this.globalIndex = this.imageArray.length - 1;
		}

		this.renderImage();
	}
}

window.customElements.define('image-carousel-mki', ImageCarouselmki);
