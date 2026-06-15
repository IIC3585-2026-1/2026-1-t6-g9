# 2026-1-t6-g9

## Como ejecutar el proyecto en local

```bash
python3 -m http.server 8000
```

Abrir en navegador: http://127.0.0.1:8000/

## Uso de IA

Durante el desarrollo del proyecto se utilizo inteligencia artificial como herramienta de apoyo para orientar y revisar distintas partes del trabajo. Su uso fue principalmente para resolver dudas sobre Web Components nativos y para mejorar la forma en que los componentes se integran dentro de una pagina simple con JavaScript.

La IA nos ayudo a:

- Comprender mejor la estructura basica de un Web Component usando `customElements.define`, clases que extienden `HTMLElement`, `HTML templates` y `Shadow DOM`.
- Revisar como encapsular estilos dentro de cada componente para evitar que el CSS global de la pagina afectara su funcionamiento interno.
- Pensar la API de cada componente, por ejemplo el uso de atributos como `value`, `min`, `max`, `step`, `checked`, `href`, `open` y variables CSS como `--card-width` y `--card-height`.
- Proponer formas de reutilizar los componentes mas de una vez en la pagina, cambiando atributos, contenido por slots y estilos externos.
- Detectar detalles mejorables en los componentes, como la conveniencia de emitir eventos cuando cambia el valor de un slider, switch o campo numerico.
- Ordenar la pagina de demostracion para que los componentes no aparecieran aislados, sino dentro de una aplicacion simple de delivery donde tuvieran un uso concreto.
- Sugerir una seccion adicional de variantes para mostrar de manera mas clara que un mismo componente puede usarse con distintas configuraciones.

Todas las sugerencias entregadas por la IA fueron revisadas y adaptadas manualmente. No se copio codigo sin entenderlo.

## Autoevaluacion

Consideramos que el proyecto cumple con el objetivo principal de experimentar con Web Components usando tecnologias nativas del navegador. Se implementaron componentes reutilizables con `template`, `Custom Elements` y `Shadow DOM`, y se integraron en una pagina funcional hecha con JavaScript.

Durante el trabajo aprendimos especialmente sobre la separacion entre el DOM principal y el Shadow DOM, el uso de slots para insertar contenido externo y la forma en que los atributos pueden servir como API publica de un componente. Tambien fue util trabajar con variables CSS para permitir personalizacion desde afuera sin romper la encapsulacion interna.

La mayor dificultad estuvo en decidir que parte de cada componente debia quedar encapsulada y que parte debia ser configurable desde la pagina. Por ejemplo, en componentes como `mi-card`, `mi-slider` y `mi-switch`, fue necesario equilibrar estilos internos, atributos y contenido proyectado mediante slots.

Como critica podriamos haber dedicado mas tiempo a revisar con mayor profundidad la documentacion oficial de Web Components y entender más por cuenta propia de ello que por preguntas hechas mediante IA.

En general, el trabajo nos permitio entender mejor como crear componentes propios sin depender de frameworks, y como estos pueden insertarse varias veces en una misma pagina manteniendo comportamiento y estilos encapsulados.
