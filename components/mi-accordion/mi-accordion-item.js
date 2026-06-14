const accordionItemTemplate =
    document.createElement("template");

accordionItemTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: Arial, sans-serif;
            border-bottom: 1px solid #ddd;
        }

        button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 14px 16px;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            font-weight: bold;
            text-align: left;
            cursor: pointer;
        }

        button::after {
            content: "+";
            margin-left: 16px;
            font-size: 20px;
        }

        :host([open]) button::after {
            content: "−";
        }

        .content {
            display: none;
            padding: 0 16px 16px;
        }

        :host([open]) .content {
            display: block;
        }
    </style>

    <button type="button" aria-expanded="false">
        <slot name="heading"></slot>
    </button>

    <div class="content">
        <slot></slot>
    </div>
`;

class MiAccordionItem extends HTMLElement {

    static get observedAttributes() {
        return ["open"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            accordionItemTemplate.content.cloneNode(true)
        );

        this.button = this.shadowRoot.querySelector("button");
        this.button.addEventListener(
            "click",
            () => this.toggle()
        );
    }

    attributeChangedCallback() {
        if (!this.button) {
            return;
        }

        const isOpen = this.hasAttribute("open");

        this.button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (isOpen && this.isConnected) {
            this.dispatchEvent(
                new CustomEvent("accordion-item-open", {
                    bubbles: true
                })
            );
        }
    }

    toggle() {
        const willOpen = !this.hasAttribute("open");

        this.toggleAttribute("open", willOpen);
    }
}

customElements.define(
    "mi-accordion-item",
    MiAccordionItem
);
