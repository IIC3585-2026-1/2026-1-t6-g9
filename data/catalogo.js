window.DELIVERY_CATALOG = {
    categories: [
        { id: "todos", name: "Todo", icon: "🍽️" },
        { id: "pizzas", name: "Pizzas", icon: "🍕" },
        { id: "hamburguesas", name: "Hamburguesas", icon: "🍔" },
        { id: "sushi", name: "Sushi", icon: "🍣" },
        { id: "bebidas", name: "Bebidas", icon: "🥤" },
        { id: "postres", name: "Postres", icon: "🍰" }
    ],
    dishes: [
        {
            id: "pepperoni-clasica",
            category: "pizzas",
            name: "Pepperoni clásica",
            description:
                "Salsa de tomate, mozzarella, pepperoni y orégano sobre masa artesanal.",
            price: 9990,
            spicy: 1,
            glutenFree: false,
            takeaway: true,
            featured: true,
            accent: "pizza",
            ingredients:
                "Harina de trigo, tomate triturado, mozzarella, pepperoni, aceite de oliva, levadura, sal y orégano.",
            nutrition: {
                energy: "860 kcal",
                protein: "38 g",
                carbohydrates: "92 g",
                fat: "39 g",
                sodium: "1.480 mg",
                portion: "1 pizza mediana"
            },
            allergens:
                "Contiene gluten y leche. Puede contener trazas de soya, huevo y frutos secos."
        },
        {
            id: "vegetariana-huerto",
            category: "pizzas",
            name: "Vegetariana del huerto",
            description:
                "Pimentón, champiñones, aceitunas, cebolla morada y queso mozzarella.",
            price: 8990,
            spicy: 0,
            glutenFree: false,
            takeaway: true,
            featured: false,
            accent: "pizza",
            ingredients:
                "Masa artesanal, salsa de tomate, mozzarella, pimentón, champiñones, aceitunas y cebolla morada.",
            nutrition: {
                energy: "720 kcal",
                protein: "29 g",
                carbohydrates: "96 g",
                fat: "24 g",
                sodium: "1.090 mg",
                portion: "1 pizza mediana"
            },
            allergens: "Contiene gluten y leche."
        },
        {
            id: "burger-criolla",
            category: "hamburguesas",
            name: "Burger Criolla",
            description:
                "Doble carne, queso mantecoso, cebolla caramelizada y salsa de cilantro.",
            price: 9490,
            spicy: 2,
            glutenFree: false,
            takeaway: true,
            featured: true,
            accent: "burger",
            ingredients:
                "Pan brioche, carne de vacuno, queso mantecoso, cebolla caramelizada, tomate y salsa de cilantro.",
            nutrition: {
                energy: "940 kcal",
                protein: "48 g",
                carbohydrates: "61 g",
                fat: "56 g",
                sodium: "1.720 mg",
                portion: "1 hamburguesa"
            },
            allergens: "Contiene gluten, leche, huevo y mostaza."
        },
        {
            id: "smoky-bacon",
            category: "hamburguesas",
            name: "Smoky bacon",
            description:
                "Carne a la parrilla, tocino crocante, cheddar, pepinillos y salsa ahumada.",
            price: 8490,
            spicy: 1,
            glutenFree: false,
            takeaway: true,
            featured: false,
            accent: "burger",
            ingredients:
                "Pan de papa, carne de vacuno, tocino, queso cheddar, pepinillos y salsa BBQ.",
            nutrition: {
                energy: "890 kcal",
                protein: "44 g",
                carbohydrates: "58 g",
                fat: "52 g",
                sodium: "1.850 mg",
                portion: "1 hamburguesa"
            },
            allergens: "Contiene gluten, leche, huevo y mostaza."
        },
        {
            id: "tabla-nikkei",
            category: "sushi",
            name: "Tabla Nikkei",
            description:
                "Selección de 24 piezas con salmón, camarón, palta y toques cítricos.",
            price: 12500,
            spicy: 3,
            glutenFree: true,
            takeaway: true,
            featured: true,
            accent: "sushi",
            ingredients:
                "Arroz de sushi, salmón, camarón, palta, pepino, sésamo y salsa acevichada.",
            nutrition: {
                energy: "780 kcal",
                protein: "42 g",
                carbohydrates: "112 g",
                fat: "18 g",
                sodium: "1.260 mg",
                portion: "24 piezas"
            },
            allergens:
                "Contiene pescado, crustáceos, huevo y sésamo."
        },
        {
            id: "california-roll",
            category: "sushi",
            name: "California roll",
            description:
                "Diez piezas con kanikama, palta, pepino y semillas de sésamo tostado.",
            price: 7990,
            spicy: 0,
            glutenFree: true,
            takeaway: true,
            featured: false,
            accent: "sushi",
            ingredients:
                "Arroz de sushi, kanikama, palta, pepino, nori y semillas de sésamo.",
            nutrition: {
                energy: "460 kcal",
                protein: "17 g",
                carbohydrates: "72 g",
                fat: "12 g",
                sodium: "740 mg",
                portion: "10 piezas"
            },
            allergens: "Contiene crustáceos, pescado y sésamo."
        },
        {
            id: "limonada-menta",
            category: "bebidas",
            name: "Limonada menta",
            description:
                "Limón recién exprimido, menta fresca y un toque de jengibre.",
            price: 3490,
            spicy: 0,
            glutenFree: true,
            takeaway: true,
            featured: false,
            accent: "drink",
            ingredients:
                "Jugo de limón, agua filtrada, menta, jengibre y azúcar.",
            nutrition: {
                energy: "120 kcal",
                protein: "0 g",
                carbohydrates: "30 g",
                fat: "0 g",
                sodium: "8 mg",
                portion: "500 ml"
            },
            allergens: "No contiene alérgenos de declaración obligatoria."
        },
        {
            id: "smoothie-berries",
            category: "bebidas",
            name: "Smoothie de berries",
            description:
                "Frutilla, arándano y frambuesa licuados con bebida vegetal.",
            price: 4490,
            spicy: 0,
            glutenFree: true,
            takeaway: true,
            featured: false,
            accent: "drink",
            ingredients:
                "Frutilla, arándano, frambuesa, plátano y bebida de almendras.",
            nutrition: {
                energy: "210 kcal",
                protein: "4 g",
                carbohydrates: "43 g",
                fat: "4 g",
                sodium: "65 mg",
                portion: "450 ml"
            },
            allergens: "Contiene almendras."
        },
        {
            id: "cheesecake-berries",
            category: "postres",
            name: "Cheesecake Berries",
            description:
                "Cheesecake cremoso con compota de frutos rojos ligeramente ácida.",
            price: 4990,
            spicy: 0,
            glutenFree: false,
            takeaway: true,
            featured: true,
            accent: "dessert",
            ingredients:
                "Queso crema, galletas, mantequilla, huevos, azúcar y frutos rojos.",
            nutrition: {
                energy: "480 kcal",
                protein: "8 g",
                carbohydrates: "52 g",
                fat: "27 g",
                sodium: "340 mg",
                portion: "1 trozo"
            },
            allergens: "Contiene gluten, leche y huevo."
        },
        {
            id: "mousse-chocolate",
            category: "postres",
            name: "Mousse de chocolate",
            description:
                "Chocolate amargo, textura aireada y crocante de cacao.",
            price: 4290,
            spicy: 0,
            glutenFree: true,
            takeaway: false,
            featured: false,
            accent: "dessert",
            ingredients:
                "Chocolate 70% cacao, crema, huevo, azúcar y nibs de cacao.",
            nutrition: {
                energy: "390 kcal",
                protein: "7 g",
                carbohydrates: "35 g",
                fat: "25 g",
                sodium: "95 mg",
                portion: "180 g"
            },
            allergens: "Contiene leche y huevo."
        }
    ]
};
