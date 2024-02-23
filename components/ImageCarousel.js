const carouselTemplate = document.createElement('template');
carouselTemplate.innerHTML = `
    <style>
        .carousel {
            display: flex;
            height: 100%;
        }

        .carousel__grid {
            flex: 1;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(11, 1fr);
            grid-template-rows: repeat(4, 1fr);
            width: 100%;
            height: 100%;
        }

        .carousel__image img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .img-1 {
            grid-column: 1 / -1;
            grid-row: 1 / 4;
        }

        .img-2 {
            grid-column: 2 / span 3;
        }

        .img-3 {
            grid-column: 5 / span 3;
        }

        .img-4 {
            grid-column: 8 / span 3;
        }

        button {
            background: transparent;
            border: none;
            color: #686868;
            padding: 0;
        }

        button svg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 30px;
        }

        button:hover {
            color: rgba(35, 50, 53, 0.85);
        }

        button:active {
            color: #000;
        }

        .previous-btn {
            grid-row-start: 4;
            grid-column-start: 1;
        }
    </style>
    <div class="carousel">
        <div class="carousel__grid">
            <div class="carousel__image img-1">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="carousel__image img-2">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="carousel__image img-3">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="carousel__image img-4">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <button class="previous-btn">
                <svg>
                    <use xlink:href="#decrease-arrow" />
                </svg>
            </button>
            <button class="next-btn">
                <svg>
                    <use xlink:href="#increase-arrow" />
                </svg>
        </button>
        </div>
    </div>
    <svg style="display: none;">
        <symbol id="increase-arrow">
            <path d="M2 29L14 15.5185L2 1" stroke="currentColor" stroke-width="3" fill="none"/>
        </symbol>
        <symbol id="decrease-arrow">
            <path d="M14 1L2 14.4815L14 29" stroke="currentColor" stroke-width="3" fill="none"/>
        </symbol>
    </svg>
`;

class ImageCarousel extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.appendChild(carouselTemplate.content.cloneNode(true));

		this.nextBtn = this.shadow.querySelector('.previous-btn');
		this.previousBtn = this.shadow.querySelector('.next-btn');
		this.img1 = this.shadow.querySelector('.img-1 img');
		this.img2 = this.shadow.querySelector('.img-2 img');
		this.img3 = this.shadow.querySelector('.img-3 img');
		this.img4 = this.shadow.querySelector('.img-4 img');
	}

	connectedCallback() {
		this.nextBtn.addEventListener('click', this.nextBtnHandler);
		this.previousBtn.addEventListener('click', this.previousBtnHandler);
		this.imageArray = JSON.parse(this.dataset.imagearray);
		this.renderImages();
	}

	renderImages() {
		this.img1.src = this.imageArray[0];
		this.img2.src = this.imageArray[1];
		this.img3.src = this.imageArray[2];
		this.img4.src = this.imageArray[3];
	}

	nextBtnHandler = () => {
		const image = this.imageArray.pop();
		this.imageArray.splice(0, 0, image);

		console.log(this.imageArray);

		this.renderImages();
	};

	previousBtnHandler = () => {
		const image = this.imageArray.shift();
		this.imageArray.push(image);

		console.log(this.imageArray);

		this.renderImages();
	};
}

window.customElements.define('image-carousel', ImageCarousel);
