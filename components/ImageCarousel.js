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
            grid-template-rows: 75% 25%;
            width: 100%;
            height: 100%;
        }

        .carousel__main-img {
            grid-column: 1 / -1;
        }

        .carousel__grid.single .carousel__main-img {
            grid-row: 1 / -1;
        }

        .carousel__controls {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(11, 1fr);
            width: 100%;
            height: 100%;
            grid-column: 1 / -1;
        }

        .carousel__grid.single .carousel__controls {
            display: none;
        }

        .carousel__images {
            display: flex;
            gap: 20px;
            justify-content: center;
            grid-column: 2 / 11;
            overflow: hidden;
        }

        .carousel__image {
            width: 100%;
            height: 100%;
        }

        .carousel__image img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .secondary-image-container {
            width: 33%;
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
    </style>
    <div class="carousel">
        <div class="carousel__grid">
            <div class="carousel__main-img">

                <div class="carousel__image img-1">
                    <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
                </div>

            </div>
                
            <div class="carousel__controls">

                <button class="previous-btn">
                <svg>
                    <use xlink:href="#decrease-arrow" />
                </svg>
                </button>
                <div class="carousel__images">
                </div>
                <button class="next-btn">
                    <svg>
                        <use xlink:href="#increase-arrow" />
                    </svg>
                </button>

            </div>
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

		this.carouselGrid = this.shadow.querySelector('.carousel__grid');
		this.carouselImages = this.shadow.querySelector('.carousel__images');
		this.primaryImg = this.shadow.querySelector(
			'.carousel__main-img .carousel__image img'
		);
		this.nextBtn = this.shadow.querySelector('.previous-btn');
		this.previousBtn = this.shadow.querySelector('.next-btn');
	}

	connectedCallback() {
		if (this.nextBtn) {
			this.nextBtn.addEventListener('click', this.nextBtnHandler);
		}

		if (this.previousBtn) {
			this.previousBtn.addEventListener('click', this.previousBtnHandler);
		}
		this.imageArray = JSON.parse(this.dataset.imagearray);
		this.renderImages();
	}

	renderImages = () => {
		// image 1
		this.primaryImg.src = this.imageArray[0].url;
		this.primaryImg.alt = this.imageArray[0].title;

		if (this.imageArray.length < 2) {
			this.carouselGrid.classList.add('single');
		} else {
			this.carouselImages.innerHTML = `
		        ${this.imageArray
							.slice(1, 4)
							.map(
								(item, index) =>
									`<div class="carousel__image secondary-image-container img-${
										index + 2
									}">
                                                <img src="${item.url}" /></div>`
							)
							.join('')}
		    `;
		}
	};

	nextBtnHandler = () => {
		const image = this.imageArray.pop();
		this.imageArray.splice(0, 0, image);

		this.renderImages();
	};

	previousBtnHandler = () => {
		const image = this.imageArray.shift();
		this.imageArray.push(image);

		this.renderImages();
	};
}

window.customElements.define('image-carousel', ImageCarousel);
