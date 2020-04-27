import React from "react";

export const NUM = 14;

export default {
  exp_1: {
    id: "exp_1",
    index: 1,
    title: { en: "Moon phases ", es: "Fases de la luna" },
    tools: "SVG",
    info: {
      en: (
        <p>
          Click/tap anywhere. Moon’s cycle function by{" "}
          <a
            href="https://observablehq.com/@martien/moon-phases"
            title="MoonPhases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Martien van Steenbergen.{" "}
          </a>
        </p>
      ),
      es: (
        <p>
          Haz click en cualquier parte. Función para los ciclos de la luna de{" "}
          <a
            href="https://observablehq.com/@martien/moon-phases"
            title="MoonPhases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Martien van Steenbergen.{" "}
          </a>
        </p>
      ),
    },
  },
  exp_2: {
    id: "exp_2",
    index: 2,
    title: { en: "Hexagonal bins", es: "Hexágonos" },
    tools: "SVG, d3",
    info: {
      en: (
        <p>
          Grid:{" "}
          <a
            href="https://github.com/d3/d3-hexbin"
            title="d3-hexbin on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            d3-hexbin
          </a>
          . Resize the window or click the switch button on the top right corner
          to generate more random patterns.
        </p>
      ),
      es: (
        <p>
          Grid:{" "}
          <a
            href="https://github.com/d3/d3-hexbin"
            title="d3-hexbin on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            d3-hexbin
          </a>
          . Redimensiona la ventana o haz click en el botón de la esquina
          superior derecha para generar otros patrones.
        </p>
      ),
    },
  },
  exp_3: {
    id: "exp_3",
    index: 3,
    title: { en: "The Office S04E05", es: "The Office S04E05" },
    tools: "Canvas",
    info: {
      en: (
        <p>
          <a
            href="https://www.youtube.com/watch?v=QOtuX0jL85Y"
            title="The DVD Logo - The Office US"
            target="_blank"
            rel="noopener noreferrer"
          >
            The DVD Logo - The Office US.
          </a>{" "}
          Shows number of bounces and number of hits into the corner of the
          screen.
        </p>
      ),
      es: (
        <p>
          <a
            href="https://www.youtube.com/watch?v=QOtuX0jL85Y"
            title="The DVD Logo - The Office US"
            target="_blank"
            rel="noopener noreferrer"
          >
            DVD Logo - The Office US.
          </a>{" "}
          Muestra el número de rebotes y el número de rebotes en la esquina de
          la pantalla.
        </p>
      ),
    },
  },
  exp_4: {
    id: "exp_4",
    index: 4,
    title: { en: "Loop", es: "Loop" },
    tools: "SVG",
    info: {
      en: "Animated patterns. Disabled on Safari because of bad performance.",
      es: "Patrones animados. Desactivado en Safari por mal rendimiento.",
    },
  },
  exp_5: {
    id: "exp_5",
    index: 5,
    title: { en: "Floppy disks", es: "Discos flexibles" },
    tools: "Svg, react-spring",
    info: {
      en: <p>Click/tap anywhere.</p>,
      es: <p>Haz click o toca en cualquier parte.</p>,
    },
  },
  exp_6: {
    id: "exp_6",
    index: 6,
    title: { en: "Eye", es: "Ojo" },
    tools: "three.js, r3f, react-spring",
    info: {
      en: (
        <p>
          {" "}
          Extends{" "}
          <a
            href="https://github.com/ryanking1809/threejs-meshline"
            title="THREE.MeshLine on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            threejs-meshline
          </a>
        </p>
      ),
      es: (
        <p>
          {" "}
          Extiende{" "}
          <a
            href="https://github.com/ryanking1809/threejs-meshline"
            title="THREE.MeshLine on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            threejs-meshline.
          </a>
        </p>
      ),
    },
  },
  exp_7: {
    id: "exp_7",
    index: 7,
    title: { en: "Simulation", es: "Simulación" },
    tools: "Canvas",
    info: {
      en: (
        <p>
          Inspired by this{" "}
          <a
            href="https://www.washingtonpost.com/graphics/2020/world/corona-simulator/"
            title="Dave Bees and Bombs on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Washington Post visualization.
          </a>
        </p>
      ),
      es: (
        <p>
          Inspirado en esta{" "}
          <a
            href="https://www.washingtonpost.com/graphics/2020/world/corona-simulator/"
            title="Dave Bees and Bombs on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            visualización del Washington Post.
          </a>
        </p>
      ),
    },
  },
  exp_8: {
    id: "exp_8",
    index: 8,
    title: { en: "Unabomber", es: "Unabomber" },
    tools: "Canvas",
    info: {
      en: (
        <p>
          <span style={{ color: "#AD8762" }}>■</span> Explosion with victims.{" "}
          <span style={{ color: "#ADB1B5" }}>■</span> Bomb defused
        </p>
      ),
      es: (
        <p>
          <span style={{ color: "#AD8762" }}>■</span> Explosión con victimas.{" "}
          <span style={{ color: "#ADB1B5" }}>■</span> Bomba desactivada.
        </p>
      ),
    },
  },
  exp_9: {
    id: "exp_9",
    index: 9,
    title: { en: "Factorization diagrams", es: "Factorización" },
    tools: "R3F, Three, React spring",
    info: {
      en: (
        <p>
          Brent Yorgey's{" "}
          <a
            href="https://mathlesstraveled.com/2012/10/05/factorization-diagrams/"
            title="Mathless traveled"
            target="_blank"
            rel="noopener noreferrer"
          >
            factorization diagrams
          </a>{" "}
          on 3D.
        </p>
      ),
      es: (
        <p>
          <a
            href="https://mathlesstraveled.com/2012/10/05/factorization-diagrams/"
            title="Mathless traveled"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diagramas de factorización
          </a>{" "}
          de Brent Yorgey en 3D.
        </p>
      ),
    },
  },
  exp_10: {
    id: "exp_10",
    index: 10,
    title: { en: "Cylinders", es: "Cilindros" },
    tools: "R3F, THREE",
    info: {
      en: (
        <p>
          Playing with{" "}
          <a
            href="https://www.instagram.com/p/B3dHAHCHSrv/"
            title="Dave Bees and Bombs on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            this gif
          </a>{" "}
          by Dave Bees and Bombs.
        </p>
      ),
      es: (
        <p>
          Jugando con{" "}
          <a
            href="https://www.instagram.com/p/B3dHAHCHSrv/"
            title="Dave Bees and Bombs on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            este gif
          </a>{" "}
          de Dave Bees and Bombs.
        </p>
      ),
    },
  },
  exp_11: {
    id: "exp_11",
    index: 11,
    title: { en: "COVID daily cases", es: "Casos diarios COVID" },
    tools: "Canvas, svg, d3",
    info: {
      en: (
        <p>
          Click or tap on each country. Check out this{" "}
          <a
            href="https://www.nytimes.com/interactive/2020/03/21/us/coronavirus-us-cases-spread.html"
            title="Coronavirus US cases"
            target="_blank"
            rel="noopener noreferrer"
          >
            cartogram by the NYT
          </a>
          . Data:{" "}
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            title="2019 Novel Coronavirus COVID-19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johns Hopkins CSSE.
          </a>
        </p>
      ),
      es: (
        <p>
          Haz click en cada país para desplegar más datos. Recreando este{" "}
          <a
            href="https://www.nytimes.com/interactive/2020/03/21/us/coronavirus-us-cases-spread.html"
            title="Coronavirus US cases"
            target="_blank"
            rel="noopener noreferrer"
          >
            cartograma del NYT
          </a>
          . Datos:{" "}
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            title="2019 Novel Coronavirus COVID-19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johns Hopkins CSSE.
          </a>
        </p>
      ),
    },
  },
  exp_12: {
    id: "exp_12",
    index: 12,
    title: { en: "Breakout", es: "Breakout" },
    tools: "Canvas",
    info: {
      en: (
        <p>
          Going through this Mozilla's{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript"
            title="2D breakout game using pure JavaScript"
            target="_blank"
            rel="noopener noreferrer"
          >
            canvas tutorial
          </a>{" "}
          in React.
        </p>
      ),
      es: (
        <p>
          Siguiendo este{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript"
            title="2D breakout game using pure JavaScript"
            target="_blank"
            rel="noopener noreferrer"
          >
            tutorial de canvas de Mozilla
          </a>{" "}
          en React.
        </p>
      ),
    },
  },
  exp_13: {
    id: "exp_13",
    index: 13,
    title: { en: "Lines", es: "Líneas" },
    tools: "THREE, R3F",
    info: {
      en: (
        <p>
          Click/tap anywhere. Extends{" "}
          <a
            href="https://github.com/ryanking1809/threejs-meshline"
            title="THREE.MeshLine on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            threejs-meshline
          </a>
        </p>
      ),
      es: (
        <p>
          Haz click en cualquier parte. Extiende{" "}
          <a
            href="https://github.com/ryanking1809/threejs-meshline"
            title="THREE.MeshLine on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            threejs-meshline
          </a>
        </p>
      ),
    },
  },
  exp_14: {
    id: "exp_14",
    index: 14,
    title: { en: "Criterion AR", es: "Criterion AR" },
    tools: "Canvas, Node",
    info: {
      en: (
        <p>
          Shows the aspect ratio of all the numbered releases, excluding
          anthologies and box sets, of the  <a
            href="https://www.criterion.com/"
            title="Criterion"
            target="_blank"
            rel="noopener noreferrer"
          >
            Criterion
          </a> main collection.
        </p>
      ),
      es: (
        <p>
          Visualiza el aspect ratio de todas las películas numeradas, excluyendo
          antologías y box sets, de la colección principal de{" "}
          <a
            href="https://www.criterion.com/"
            title="Criterion"
            target="_blank"
            rel="noopener noreferrer"
          >
            Criterion
          </a>
          .
        </p>
      ),
    },
  },
};
