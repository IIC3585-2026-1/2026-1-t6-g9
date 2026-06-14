const cardTemplate = document.createElement("template");

cardTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            width: var(--card-width, 280px);
            height: var(--card-height, auto);
            box-sizing: border-box;
        }

        .card {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 12px;
            background: white;
            box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
        }
    </style>

    <article class="card">
        <slot></slot>
    </article>
`;

class MiCard extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            cardTemplate.content.cloneNode(true)
        );
    }
}

customElements.define(
    "mi-card",
    MiCard
);
