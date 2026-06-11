const sliderTemplate = document.createElement("template");

sliderTemplate.innerHTML = `
    <style>
        :host{
            display:block;
            width:100%;
        }

        .container{
            position:relative;
            width:100%;
        }

        input[type="range"]{
            width:100%;
            margin:0;
        }

        .labels{
            position:relative;
            width:100%;
            height:30px;
            margin-top:8px;
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

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            sliderTemplate.content.cloneNode(true)
        );
    }

    connectedCallback() {

        const slider =
            this.shadowRoot.querySelector("input");

        slider.min =
            this.getAttribute("min") || "0";

        slider.max =
            this.getAttribute("max") || "100";

        slider.value =
            this.getAttribute("value") || "0";

        slider.step =
            this.getAttribute("step") || "1";
    }
}

customElements.define(
    "mi-slider",
    MiSlider
);