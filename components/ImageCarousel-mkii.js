const template2 = document.createElement('template');
template2.innerHTML = `
    <style>
        .img-carousel {
            display: flex;
            height: 100%;
        }

        button svg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 30px;
        }

        button {
            background: transparent;
            border: none;
            color: #686868;
            padding: 0;
        }

        button:hover {
            color: rgba(35, 50, 53, 0.85);
        }

        button:active {
            color: #000;
        }

        .decreaseBtn {
            grid-row-start: 4;
            grid-column-start: 1;
        }

        .img-grid {
            flex: 1;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(11, 1fr);
            grid-template-rows: repeat(4, 1fr);
            width: 100%;
            height: 100%;
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

        .img img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }


    </style>
    <div class="img-carousel">
        
        <div class="img-grid">
            <div class="img img-1">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="img img-2">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="img img-3">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <div class="img img-4">
                <img src="https://staging2.findstemz.com/wp-content/uploads/2023/11/PicComingSoon-square.png" alt="coming soon" />
            </div>
            <button class="decreaseBtn">
                <svg>
                    <use xlink:href="#decrease-arrow" />
                </svg>
            </button>
            <button class="increaseBtn">
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

class ImageCarouselmkii extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.appendChild(template2.content.cloneNode(true));

		this.increaseBtn = this.shadow.querySelector('.increaseBtn');
		this.decreaseBtn = this.shadow.querySelector('.decreaseBtn');
		this.img1 = this.shadow.querySelector('.img-1 img');
		this.img2 = this.shadow.querySelector('.img-2 img');
		this.img3 = this.shadow.querySelector('.img-3 img');
		this.img4 = this.shadow.querySelector('.img-4 img');
	}

	connectedCallback() {
		this.increaseBtn.addEventListener('click', this.increaseBtnHandler);
		this.decreaseBtn.addEventListener('click', this.decreaseBtnHandler);
		this.imageArray = JSON.parse(this.dataset.imagearray);
		this.renderImages();
	}

	renderImages() {
		this.img1.src = this.imageArray[0];
		this.img2.src = this.imageArray[1];
		this.img3.src = this.imageArray[2];
		this.img4.src = this.imageArray[3];
	}

	increaseBtnHandler = () => {
		const image = this.imageArray.shift();
		this.imageArray.push(image);

		console.log(this.imageArray);

		this.renderImages();
	};

	decreaseBtnHandler = () => {
		const image = this.imageArray.pop();
		this.imageArray.splice(0, 0, image);

		console.log(this.imageArray);

		this.renderImages();
	};
}

window.customElements.define('image-carousel-mkii', ImageCarouselmkii);
