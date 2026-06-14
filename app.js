const formatPrice = (value) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(value);

const escapeHtml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

const startDeliveryApp = () => {
    const catalog = window.DELIVERY_CATALOG;

    if (!catalog) {
        return;
    }

    const elements = {
        categoryList: document.querySelector("#category-list"),
        featuredList: document.querySelector("#featured-list"),
        menuGrid: document.querySelector("#menu-grid"),
        menuTitle: document.querySelector("#menu-title"),
        resultsText: document.querySelector("#results-text"),
        emptyState: document.querySelector("#empty-state"),
        priceSlider: document.querySelector("#price-filter"),
        spicySlider: document.querySelector("#spicy-filter"),
        priceValue: document.querySelector("#price-value"),
        spicyValue: document.querySelector("#spicy-value"),
        glutenSwitch: document.querySelector("#gluten-filter"),
        takeawaySwitch: document.querySelector("#takeaway-filter"),
        headerBreadcrumb: document.querySelector("#header-breadcrumb"),
        detailName: document.querySelector("#detail-name"),
        detailDescription: document.querySelector("#detail-description"),
        detailIngredients: document.querySelector("#detail-ingredients"),
        detailNutrition: document.querySelector("#detail-nutrition"),
        detailAllergens: document.querySelector("#detail-allergens")
    };

    const state = {
        category: "todos",
        maxPrice: Number(elements.priceSlider.value),
        maxSpicy: Number(elements.spicySlider.value),
        glutenFree: elements.glutenSwitch.checked,
        takeaway: elements.takeawaySwitch.checked,
        selectedDish: catalog.dishes[0].id
    };

    const getCategory = (id) =>
        catalog.categories.find((category) => category.id === id);

    const getFilteredDishes = () =>
        catalog.dishes.filter((dish) => {
            const matchesCategory =
                state.category === "todos" ||
                dish.category === state.category;

            return (
                matchesCategory &&
                dish.price <= state.maxPrice &&
                dish.spicy <= state.maxSpicy &&
                (!state.glutenFree || dish.glutenFree) &&
                (!state.takeaway || dish.takeaway)
            );
        });

    const renderCategories = () => {
        elements.categoryList.innerHTML = catalog.categories
            .map((category) => `
                <mi-card
                    style="--card-width: 128px; --card-height: 84px;"
                >
                    <button
                        class="category-card"
                        type="button"
                        data-category="${escapeHtml(category.id)}"
                        aria-pressed="${category.id === state.category}"
                    >
                        <span class="category-icon">${category.icon}</span>
                        ${escapeHtml(category.name)}
                    </button>
                </mi-card>
            `)
            .join("");
    };

    const renderFeatured = () => {
        elements.featuredList.innerHTML = catalog.dishes
            .filter((dish) => dish.featured)
            .map((dish) => `
                <mi-card
                    style="--card-width: 220px; --card-height: 160px;"
                >
                    <button
                        class="featured-card ${escapeHtml(dish.accent)}"
                        type="button"
                        data-dish="${escapeHtml(dish.id)}"
                    >
                        <span class="featured-price">
                            ${formatPrice(dish.price)}
                        </span>
                        <span class="featured-copy">
                            <strong>${escapeHtml(dish.name)}</strong>
                            <small>${escapeHtml(dish.description)}</small>
                        </span>
                    </button>
                </mi-card>
            `)
            .join("");
    };

    const renderMenu = () => {
        const dishes = getFilteredDishes();
        const activeCategory = getCategory(state.category);
        const categoryName =
            state.category === "todos"
                ? "Menú principal"
                : activeCategory.name;

        elements.menuTitle.textContent = categoryName;
        elements.resultsText.textContent =
            `${dishes.length} ${dishes.length === 1 ? "resultado" : "resultados"}`;
        elements.emptyState.hidden = dishes.length > 0;

        elements.menuGrid.innerHTML = dishes
            .map((dish) => `
                <mi-card style="--card-width: 100%; --card-height: 100%;">
                    <article class="dish-card">
                        <button
                            class="dish-main"
                            type="button"
                            data-dish="${escapeHtml(dish.id)}"
                        >
                            <span class="dish-type">
                                ${escapeHtml(getCategory(dish.category).name)}
                            </span>
                            <h3>${escapeHtml(dish.name)}</h3>
                            <p>${escapeHtml(dish.description)}</p>
                            <span class="dish-tags">
                                ${dish.glutenFree ? "<span>Sin gluten</span>" : ""}
                                <span>Picante ${dish.spicy}/3</span>
                            </span>
                        </button>
                        <div class="dish-footer">
                            <span class="price">${formatPrice(dish.price)}</span>
                            <campo-numerico value="0" no-negativos>
                                Cantidad:
                            </campo-numerico>
                        </div>
                    </article>
                </mi-card>
            `)
            .join("");
    };

    const renderBreadcrumb = (dish = null) => {
        const categoryId =
            dish?.category ||
            (state.category === "todos" ? null : state.category);
        const category = categoryId ? getCategory(categoryId) : null;

        elements.headerBreadcrumb.innerHTML = `
            <mi-breadcrumb-item href="#inicio">Inicio</mi-breadcrumb-item>
            ${
                category
                    ? `<mi-breadcrumb-item href="#menu">${escapeHtml(category.name)}</mi-breadcrumb-item>`
                    : ""
            }
            <mi-breadcrumb-item>
                ${dish ? escapeHtml(dish.name) : "Catálogo"}
            </mi-breadcrumb-item>
        `;
    };

    const renderDetail = (dish) => {
        if (!dish) {
            return;
        }

        state.selectedDish = dish.id;
        elements.detailName.textContent = dish.name;
        elements.detailDescription.textContent = dish.description;
        elements.detailIngredients.textContent = dish.ingredients;
        elements.detailAllergens.textContent = dish.allergens;
        elements.detailNutrition.innerHTML = Object.entries(dish.nutrition)
            .map(([key, value]) => {
                const labels = {
                    energy: "Energía",
                    protein: "Proteínas",
                    carbohydrates: "Carbohidratos",
                    fat: "Grasas",
                    sodium: "Sodio",
                    portion: "Porción"
                };

                return `<li>${labels[key]}: ${escapeHtml(value)}</li>`;
            })
            .join("");

        renderBreadcrumb(dish);
    };

    const updateFilters = () => {
        state.maxPrice = Number(elements.priceSlider.value);
        state.maxSpicy = Number(elements.spicySlider.value);
        state.glutenFree = elements.glutenSwitch.checked;
        state.takeaway = elements.takeawaySwitch.checked;

        elements.priceValue.textContent =
            formatPrice(state.maxPrice);
        elements.spicyValue.textContent =
            `${state.maxSpicy} de 3`;

        renderMenu();
    };

    elements.categoryList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category]");

        if (!button) {
            return;
        }

        state.category = button.dataset.category;
        renderCategories();
        renderMenu();
        renderBreadcrumb();
        document.querySelector("#menu").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    const handleDishSelection = (event) => {
        const button = event.target.closest("[data-dish]");

        if (!button) {
            return;
        }

        const dish = catalog.dishes.find(
            (item) => item.id === button.dataset.dish
        );

        renderDetail(dish);
        document.querySelector("#detail").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    elements.menuGrid.addEventListener("click", handleDishSelection);
    elements.featuredList.addEventListener("click", handleDishSelection);
    elements.priceSlider.addEventListener("input", updateFilters);
    elements.spicySlider.addEventListener("input", updateFilters);
    elements.glutenSwitch.addEventListener("change", updateFilters);
    elements.takeawaySwitch.addEventListener("change", updateFilters);

    renderCategories();
    renderFeatured();
    renderMenu();
    renderDetail(catalog.dishes[0]);
    updateFilters();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startDeliveryApp);
} else {
    startDeliveryApp();
}
