const accordionTemplate = document.createElement("template");

accordionTemplate.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>

    <div class="accordion">
        <slot></slot>
    </div>
`;

class MiAccordion extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            accordionTemplate.content.cloneNode(true)
        );
    }

    connectedCallback() {
        this.addEventListener(
            "accordion-item-open",
            this.handleItemOpen
        );

        this.keepOnlyOneOpen();
    }

    disconnectedCallback() {
        this.removeEventListener(
            "accordion-item-open",
            this.handleItemOpen
        );
    }

    handleItemOpen = (event) => {
        this.querySelectorAll("mi-accordion-item")
            .forEach((item) => {
                if (item !== event.target) {
                    item.removeAttribute("open");
                }
            });
    };

    keepOnlyOneOpen() {
        const openItems =
            this.querySelectorAll("mi-accordion-item[open]");

        openItems.forEach((item, index) => {
            if (index > 0) {
                item.removeAttribute("open");
            }
        });
    }
}

customElements.define(
    "mi-accordion",
    MiAccordion
);
