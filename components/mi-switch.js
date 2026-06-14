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
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
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

        input:focus-visible + .slider {
            outline: 3px solid rgb(76 175 80 / 35%);
            outline-offset: 2px;
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

        .checked-message {
            display: none;
        }

        :host([checked]) .checked-message {
            display: inline;
        }

        :host([checked]) .unchecked-message {
            display: none;
        }
    </style>

    <div class="container">
        <slot></slot>

        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>

        <span class="message">
            <span class="checked-message">
                <slot name="checked-message">Sí</slot>
            </span>
            <span class="unchecked-message">
                <slot name="unchecked-message">No</slot>
            </span>
        </span>
    </div>
`;

class MiSwitch extends HTMLElement {

    static get observedAttributes() {
        return ["checked"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            switchTemplate.content.cloneNode(true)
        );

        this.checkbox =
            this.shadowRoot.querySelector("input");

        this.checkbox.addEventListener("change", () => {
            this.checked = this.checkbox.checked;

            this.dispatchEvent(
                new CustomEvent("change", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        checked: this.checked
                    }
                })
            );
        });
    }

    connectedCallback() {
        this.syncCheckedState();
    }

    attributeChangedCallback() {
        this.syncCheckedState();
    }

    get checked() {
        return this.hasAttribute("checked");
    }

    set checked(value) {
        this.toggleAttribute("checked", Boolean(value));
    }

    syncCheckedState() {
        if (this.checkbox) {
            this.checkbox.checked = this.checked;
        }
    }
}

customElements.define(
    "mi-switch",
    MiSwitch
);
