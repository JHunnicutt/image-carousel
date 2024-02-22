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
            background: darkslateblue;
        }

        .img-2, .img-3, .img-4 {
            grid-row-end: -1;
        }

        .img-2 {
            background: tomato;
        }

        .img-3 {
            background: seagreen;
        }

        .img-4 {
            background: gold;
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
        <button className="increaseBtn">></button>
    </div>
`;

class ImageCarouselmkii extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.appendChild(template2.content.cloneNode(true));
	}
}

window.customElements.define('image-carousel-mkii', ImageCarouselmkii);
