class MiSliderLabel extends HTMLElement {

    connectedCallback() {

        const position =
            this.getAttribute("position") || "0";

        this.style.position = "absolute";
        this.style.left = position + "%";
        this.style.transform = "translateX(-50%)";
        this.style.fontSize = "12px";
        this.style.whiteSpace = "nowrap";
    }
}

customElements.define(
    "mi-slider-label",
    MiSliderLabel
);