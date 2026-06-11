const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            font-family: Arial, sans-serif;
            margin: 10px;
        }

        .container {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        label {
            font-weight: bold;
        }

        input {
            width: 60px;
            padding: 5px;
            text-align: center;
            font-size: 14px;
        }

        /* Oculta flechas nativas en Chrome, Edge y Safari */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Oculta flechas nativas en Firefox */
        input[type="number"] {
            appearance: textfield;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        button {
            width: 30px;
            height: 22px;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f5f5f5;
        }

        button:hover {
            background-color: #e5e5e5;
        }
    </style>

    <div class="container">
        <label>
            <slot></slot>
        </label>

        <input type="number">

        <div class="buttons">
            <button id="inc">+</button>
            <button id="dec">−</button>
        </div>
    </div>
`;

class CampoNumerico extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );
    }

    connectedCallback() {

        const input = this.shadowRoot.querySelector("input");
        const inc = this.shadowRoot.querySelector("#inc");
        const dec = this.shadowRoot.querySelector("#dec");

        input.value = this.getAttribute("value") || 0;

        inc.addEventListener("click", () => {
            input.value = Number(input.value) + 1;
        });

        dec.addEventListener("click", () => {
            input.value = Number(input.value) - 1;
        });
    }
}

customElements.define(
    "campo-numerico",
    CampoNumerico
);