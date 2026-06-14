const sliderTemplate = document.createElement("template");

sliderTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
        }

        .container {
            position: relative;
            width: 100%;
        }

        input[type="range"] {
            width: 100%;
            margin: 0;
        }

        .labels {
            position: relative;
            width: 100%;
            height: 30px;
            margin-top: 8px;
        }
    </style>

    <div class="container">
        <input type="range">

        <div class="labels">
            <slot></slot>
        </div>
    </div>
`;

class MiSlider extends HTMLElement {

    static get observedAttributes() {
        return ["min", "max", "value", "step"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            sliderTemplate.content.cloneNode(true)
        );

        this.slider =
            this.shadowRoot.querySelector("input");

        this.slider.addEventListener("input", () => {
            this.reflectValue();
            this.emitValueEvent("input");
        });

        this.slider.addEventListener("change", () => {
            this.reflectValue();
            this.emitValueEvent("change");
        });
    }

    connectedCallback() {
        this.syncAttributes();
    }

    attributeChangedCallback() {
        this.syncAttributes();
    }

    get value() {
        return Number(this.slider.value);
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    syncAttributes() {
        if (!this.slider) {
            return;
        }

        this.slider.min = this.getAttribute("min") || "0";
        this.slider.max = this.getAttribute("max") || "100";
        this.slider.value = this.getAttribute("value") || "0";
        this.slider.step = this.getAttribute("step") || "1";
    }

    reflectValue() {
        this.setAttribute("value", this.slider.value);
    }

    emitValueEvent(type) {
        this.dispatchEvent(
            new CustomEvent(type, {
                bubbles: true,
                composed: true,
                detail: {
                    value: this.value
                }
            })
        );
    }
}

customElements.define(
    "mi-slider",
    MiSlider
);
