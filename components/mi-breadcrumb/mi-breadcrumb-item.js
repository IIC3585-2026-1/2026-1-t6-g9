const breadcrumbItemTemplate =
    document.createElement("template");

breadcrumbItemTemplate.innerHTML = `
    <style>
        :host {
            display: inline-flex;
            align-items: center;
            font-family: Arial, sans-serif;
        }

        a {
            color: #b4441e;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .current {
            color: #4b4b4b;
            font-weight: bold;
        }

        .separator {
            display: none;
            margin: 0 8px;
            color: #888;
        }

        :host([separator]) .separator {
            display: inline;
        }
    </style>

    <a class="link"></a>
    <span class="current" aria-current="page"></span>
    <span class="separator" aria-hidden="true">/</span>
`;

class MiBreadcrumbItem extends HTMLElement {

    static get observedAttributes() {
        return ["href"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            breadcrumbItemTemplate.content.cloneNode(true)
        );

        this.link = this.shadowRoot.querySelector(".link");
        this.current =
            this.shadowRoot.querySelector(".current");
        this.contentSlot = document.createElement("slot");
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        if (!this.link || !this.current) {
            return;
        }

        const href = this.getAttribute("href");
        const hasLink = href !== null;

        this.link.hidden = !hasLink;
        this.current.hidden = hasLink;

        if (hasLink) {
            this.link.href = href;
            this.link.appendChild(this.contentSlot);
        } else {
            this.link.removeAttribute("href");
            this.current.appendChild(this.contentSlot);
        }
    }
}

customElements.define(
    "mi-breadcrumb-item",
    MiBreadcrumbItem
);
