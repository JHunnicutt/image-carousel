const carouselTemplate = document.createElement('template');
carouselTemplate.innerHTML = `
    <style>
        :host {
            --r-gap: 3.76%;
            --c-gap: 5.83%;
        }

        .carousel {
            display: grid;
            grid-template-rows: calc(80.47% - (var(--r-gap) /2)) calc(19.53% - (var(--r-gap) /2));
            grid-template-columns: 8.07% 83.86% 8.07%;
            row-gap: var(--r-gap);
            height: 100%;
            aspect-ratio: 1 / 1.3;
        }

        .carousel.single {
            grid-template-rows: 100%;
        }

        .carousel__main {
            width: 100%;
            height: 100%;
            grid-row: 1 / 2;
            grid-column: 2 / 3;
        }

        .carousel.single .carousel__main {
            grid-row: 1 / -1;
            grid-column: 1 / -1;
        }

        .carousel__main img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .carousel__sub {
            display: flex;
            justify-content: center;
            gap: var(--c-gap);
            width: 100%;
            height: 100%;
            grid-row: 2 / -1;
            grid-column: 2 / 3;
        }

        .carousel.single .carousel__sub {
            display: none;
        }

        .carousel__sub-image {
            width: 33%;
            height: 100%;
            background: steelblue;
        }

        .carousel__sub-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .carousel.single .btn-container {
            display: none;
        }

        button {
            background: transparent;
            border: none;
            color: #686868;
            padding: 0;
            cursor: pointer;
            width: 100%;
            height: fit-content;
        }

        button:hover {
            color: rgba(35, 50, 53, 0.85);
        }

        button:active {
            color: #000;
        }

        .btn-container {
            display: flex;
            align-items: center;
        }
    
        .btn-container:has(> .next-btn) {
            grid-row: 1 / 2;
            grid-column: 3 / -1;
        }

        .btn-container:has(> .prev-button) {
            grid-row: 1 / 2;
            grid-column: 1 / 2;
        }

        button svg {
           width: 16px;
           height: 30px;
        }

        .previous-btn {
            text-align: start;
        }

        .next-btn {
            text-align: end;
        }

    </style>
    <div class="carousel">
        
        <div class="carousel__main">
            <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
        </div>
        
        <div class="carousel__sub">
            <div class="carousel__sub-image">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="carousel__sub-image">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="carousel__sub-image">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
        </div>
        
        <div class="btn-container">
            <button class="next-btn">
                <svg>
                    <use href="#increase-arrow" />
                </svg>
            </button>
        </div>
        
        <div class="btn-container">
            <button class="previous-btn">
                <svg>
                    <use href="#decrease-arrow" />
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

		this.carousel = this.shadow.querySelector('.carousel');
		this.primaryImg = this.shadow.querySelector('.carousel__main img');
		this.carouselSubImages = this.shadow.querySelector('.carousel__sub');
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
			this.carousel.classList.add('single');
		} else {
			this.carouselSubImages.innerHTML = `
		        ${this.imageArray
							.slice(1, 4)
							.map(
								(item, index) =>
									`<div class="carousel__sub-image img-${index + 2}">
		                                        <img src="${item.url}" />
		                                        </div>`
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
