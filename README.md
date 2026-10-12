# Portafolio de Luiyi Cifuentes

Portafolio personal en HTML, CSS y JavaScript puros (sin frameworks ni instalación).

## Estructura

```
portafolio-luiyi/
├── index.html        Contenido: textos, secciones, iconos, datos de contacto
├── css/
│   └── styles.css    Diseño: colores, tipografía, tarjetas, animaciones, responsive
├── js/
│   └── main.js       Comportamiento: tema claro/oscuro, menú móvil, animaciones
└── README.md         Esta guía
```

## Dónde cambiar cada cosa

| Quiero cambiar...                    | Archivo       | Dónde buscar                                   |
|--------------------------------------|---------------|------------------------------------------------|
| Mis datos de contacto                | `index.html`  | Busca `TODO` (sección de contacto)             |
| Textos de "Sobre mí", formación, etc.| `index.html`  | Cada sección tiene un comentario `<!-- === -->` |
| Los proyectos                        | `index.html`  | Sección `PROYECTOS`                            |
| Las estadísticas (21, 10º, 4, 2)     | `index.html`  | Atributos `data-count="..."`                   |
| Los colores                          | `css/styles.css` | Sección `01. TOKENS`, al inicio del archivo |
| Las fuentes                          | `css/styles.css` e `index.html` | Variables `--serif`, `--sans`, `--mono` y el `<link>` de Google Fonts |
| El diseño en celular                 | `css/styles.css` | Sección `19. RESPONSIVE`, al final          |
| La velocidad de las animaciones      | `css/styles.css` | Secciones `09` y `18`                       |

## Probarlo en local

1. Abre la carpeta en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Clic derecho sobre `index.html` y elige **Open with Live Server**.

## Publicarlo con GitHub Pages

```
git add .
git commit -m "Describe tu cambio"
git push
```

En GitHub: **Settings > Pages > Deploy from a branch > main / (root)**.
Cada `git push` actualiza la página en alrededor de un minuto.
