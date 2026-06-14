const sliderLabelTemplate = document.createElement("template");

sliderLabelTemplate.innerHTML = `
    <style>
        :host {
            position: absolute;
            left: var(--slider-label-position, 0%);
            transform: translateX(-50%);
            font-size: 12px;
            white-space: nowrap;
        }
    </style>

    <slot></slot>
`;

class MiSliderLabel extends HTMLElement {

    static get observedAttributes() {
        return ["position"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            sliderLabelTemplate.content.cloneNode(true)
        );
    }

    connectedCallback() {
        this.updatePosition();
    }

    attributeChangedCallback() {
        this.updatePosition();
    }

    updatePosition() {
        const position =
            Number(this.getAttribute("position") || "0");

        const validPosition =
            Number.isFinite(position) ? position : 0;

        this.style.setProperty(
            "--slider-label-position",
            `${validPosition}%`
        );
    }
}

customElements.define(
    "mi-slider-label",
    MiSliderLabel
);
