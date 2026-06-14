const horizontalScrollTemplate =
    document.createElement("template");

horizontalScrollTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
        }

        .scroll-container {
            display: flex;
            gap: var(--scroll-gap, 16px);
            overflow-x: auto;
            padding: var(--scroll-padding, 4px);
            scroll-behavior: smooth;
            scrollbar-width: thin;
        }

        ::slotted(*) {
            flex: 0 0 auto;
        }
    </style>

    <div class="scroll-container">
        <slot></slot>
    </div>
`;

class MiHorizontalScroll extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            horizontalScrollTemplate.content.cloneNode(true)
        );
    }
}

customElements.define(
    "mi-horizontal-scroll",
    MiHorizontalScroll
);
