const horizontalScrollTemplate =
    document.createElement("template");

horizontalScrollTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
        }

        .viewport.hide-scrollbar {
            overflow: hidden;
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

        .scroll-container.hide-scrollbar {
            margin-bottom: -20px;
            padding-bottom: calc(var(--scroll-padding, 4px) + 20px);
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }

        .scroll-container.hide-scrollbar::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent;
        }

        ::slotted(*) {
            flex: 0 0 auto;
        }
    </style>

    <div class="viewport">
        <div class="scroll-container">
            <slot></slot>
        </div>
    </div>
`;

class MiHorizontalScroll extends HTMLElement {

    static get observedAttributes() {
        return ["sin-barra"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            horizontalScrollTemplate.content.cloneNode(true)
        );

        this.scrollContainer =
            this.shadowRoot.querySelector(".scroll-container");
        this.viewport =
            this.shadowRoot.querySelector(".viewport");
    }

    connectedCallback() {
        this.updateScrollbar();
    }

    attributeChangedCallback() {
        this.updateScrollbar();
    }

    updateScrollbar() {
        if (!this.scrollContainer) {
            return;
        }

        this.scrollContainer.classList.toggle(
            "hide-scrollbar",
            this.hasAttribute("sin-barra")
        );

        this.viewport.classList.toggle(
            "hide-scrollbar",
            this.hasAttribute("sin-barra")
        );
    }
}

customElements.define(
    "mi-horizontal-scroll",
    MiHorizontalScroll
);
