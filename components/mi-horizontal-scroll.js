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
            padding-bottom: calc(var(--scroll-padding, 4px) + 8px);
            scroll-behavior: smooth;
            scrollbar-width: thin;
            scrollbar-color: #d94f2b #f3e2d8;
        }

        .scroll-container::-webkit-scrollbar {
            height: 9px;
        }

        .scroll-container::-webkit-scrollbar-track {
            border-radius: 999px;
            background: #f3e2d8;
        }

        .scroll-container::-webkit-scrollbar-thumb {
            border-radius: 999px;
            background: #d94f2b;
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
