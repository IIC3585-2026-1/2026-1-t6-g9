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

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

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
            <button id="inc" type="button" aria-label="Incrementar">+</button>
            <button id="dec" type="button" aria-label="Decrementar">−</button>
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

        this.input = this.shadowRoot.querySelector("input");
        this.incrementButton =
            this.shadowRoot.querySelector("#inc");
        this.decrementButton =
            this.shadowRoot.querySelector("#dec");
        this.lastNonZeroValue = 1;

        this.incrementButton.addEventListener(
            "click",
            () => this.changeBy(1)
        );

        this.decrementButton.addEventListener(
            "click",
            () => this.changeBy(-1)
        );

        this.input.addEventListener(
            "keydown",
            (event) => this.handleKeydown(event)
        );

        this.input.addEventListener(
            "input",
            () => this.validateInput()
        );
    }

    connectedCallback() {
        const initialValue =
            Number(this.getAttribute("value") ?? 0);

        this.setValue(initialValue);
    }

    get noNegativos() {
        return this.hasAttribute("no-negativos");
    }

    get sinCero() {
        return this.hasAttribute("sin-cero");
    }

    changeBy(direction) {
        const currentValue = Number(this.input.value || 0);
        let nextValue = currentValue + direction;

        if (this.sinCero && nextValue === 0) {
            nextValue = direction > 0 ? 1 : -1;
        }

        this.setValue(nextValue);
    }

    handleKeydown(event) {
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
            return;
        }

        event.preventDefault();
        this.changeBy(event.key === "ArrowUp" ? 1 : -1);
    }

    validateInput() {
        const value = Number(this.input.value);

        if (!Number.isFinite(value)) {
            return;
        }

        if (this.sinCero && value === 0) {
            this.setValue(this.lastNonZeroValue > 0 ? -1 : 1);
            return;
        }

        this.setValue(value);
    }

    setValue(value) {
        let validValue = Number.isFinite(value) ? value : 0;

        if (this.noNegativos && validValue < 0) {
            validValue = 0;
        }

        if (this.sinCero && validValue === 0) {
            validValue = 1;
        }

        if (validValue !== 0) {
            this.lastNonZeroValue = validValue;
        }

        this.input.value = String(validValue);
        this.setAttribute("value", String(validValue));
    }
}

customElements.define(
    "campo-numerico",
    CampoNumerico
);
