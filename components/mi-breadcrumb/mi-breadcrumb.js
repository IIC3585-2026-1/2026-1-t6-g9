const breadcrumbTemplate = document.createElement("template");

breadcrumbTemplate.innerHTML = `
    <style>
        :host {
            display: block;
        }

        nav {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
    </style>

    <nav aria-label="Breadcrumb">
        <slot></slot>
    </nav>
`;

class MiBreadcrumb extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            breadcrumbTemplate.content.cloneNode(true)
        );

        this.slotElement =
            this.shadowRoot.querySelector("slot");
    }

    connectedCallback() {
        this.slotElement.addEventListener(
            "slotchange",
            () => this.updateItems()
        );

        this.updateItems();
    }

    updateItems() {
        const items = this.slotElement
            .assignedElements({ flatten: true })
            .filter((element) =>
                element.matches("mi-breadcrumb-item")
            );

        items.forEach((item, index) => {
            item.toggleAttribute(
                "separator",
                index < items.length - 1
            );
        });
    }
}

customElements.define(
    "mi-breadcrumb",
    MiBreadcrumb
);
