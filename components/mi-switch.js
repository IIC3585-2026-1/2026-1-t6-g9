const switchTemplate = document.createElement("template");

switchTemplate.innerHTML = `
    <style>
        :host {
            display: inline-block;
            font-family: Arial, sans-serif;
            margin: 10px;
        }

        .container {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .switch {
            position: relative;
            width: 50px;
            height: 26px;
        }

        .switch input {
            display: none;
        }

        .slider {
            position: absolute;
            inset: 0;
            background-color: #ccc;
            border-radius: 26px;
            cursor: pointer;
            transition: 0.3s;
        }

        .slider::before {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            left: 3px;
            top: 3px;
            background: white;
            border-radius: 50%;
            transition: 0.3s;
        }

        input:checked + .slider {
            background-color: #4CAF50;
        }

        input:checked + .slider::before {
            transform: translateX(24px);
        }

        .message {
            min-width: 40px;
            font-weight: bold;
        }
    </style>

    <div class="container">

        <slot></slot>

        <label class="switch">
            <input type="checkbox" id="toggle">
            <span class="slider"></span>
        </label>

        <span class="message">
            <slot name="unchecked-message"></slot>
        </span>

    </div>
`;

class MiSwitch extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            switchTemplate.content.cloneNode(true)
        );
    }

    connectedCallback() {

        const checkbox =
            this.shadowRoot.querySelector("#toggle");

        const message =
            this.shadowRoot.querySelector(".message");

        const checkedSlot =
            this.querySelector('[slot="checked-message"]');

        const uncheckedSlot =
            this.querySelector('[slot="unchecked-message"]');

        checkbox.addEventListener("change", () => {

            message.textContent = checkbox.checked
                ? checkedSlot.textContent
                : uncheckedSlot.textContent;
        });

        message.textContent =
            uncheckedSlot.textContent;
    }
}

customElements.define(
    "mi-switch",
    MiSwitch
);