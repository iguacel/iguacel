import React from "react";

export const NUM = 29;

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
    title: { en: "COVID deaths per day", es: "Muertes diarias COVID" },
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
            Johns Hopkins University.
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
            Johns Hopkins University.
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
          anthologies and box sets, of the{" "}
          <a
            href="https://www.criterion.com/"
            title="Criterion"
            target="_blank"
            rel="noopener noreferrer"
          >
            Criterion
          </a>{" "}
          main collection.
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
  exp_15: {
    id: "exp_15",
    index: 15,
    title: { en: "Game of life", es: "Juego de la vida" },
    tools: "React, css grid",
    info: {
      en: (
        <p>
          Going through{" "}
          <a
            href="https://youtu.be/DvVt11mPuM0"
            title="2D breakout game using pure JavaScript"
            target="_blank"
            rel="noopener noreferrer"
          >
            this tutorial
          </a>{" "}
          by Ben Awad. John Conway explains the rules of the game in{" "}
          <a
            href="https://www.bradyharanblog.com/blog/john-conway-1937-2020"
            title="Does John Conway hate his Game of Life?"
            target="_blank"
            rel="noopener noreferrer"
          >
            this interview.
          </a>
        </p>
      ),
      es: (
        <p>
          Siguiendo{" "}
          <a
            href="https://youtu.be/DvVt11mPuM0"
            title="Does John Conway hate his Game of Life?"
            target="_blank"
            rel="noopener noreferrer"
          >
            este tutorial
          </a>{" "}
          de Ben Awad. John Conway explica las reglas del juego en{" "}
          <a
            href="https://www.bradyharanblog.com/blog/john-conway-1937-2020"
            title="Does John Conway hate his Game of Life?"
            target="_blank"
            rel="noopener noreferrer"
          >
            esta entrevista de Numberphile.
          </a>
        </p>
      ),
    },
  },
  exp_16: {
    id: "exp_16",
    index: 16,
    title: { en: "1977—1982", es: "1977—1982" },
    tools: "Canvas, react-spring",
    info: {
      en: (
        <p>
          Some of my favourite circular hardcore/crust punk logos (1977—1982).
          Not including the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Germs_(band)"
            title="Germs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Germs,
          </a>{" "}
          amongst others, is pretty lame. I used{" "}
          <a
            href="https://spotify.github.io/coordinator/"
            title="coördinator"
            target="_blank"
            rel="noopener noreferrer"
          >
            this tool
          </a>{" "}
          by{" "}
          <a
            href="https://twitter.com/alizauf"
            title="Aliza Aufrichtig"
            target="_blank"
            rel="noopener noreferrer"
          >
            @alizauf
          </a>{" "}
          to get the coordinates for each point.
        </p>
      ),
      es: (
        <p>
          Logos circulares de bandas hardcore/crust (1977— 1982). No incluye a
          los{" "}
          <a
            href="https://es.wikipedia.org/wiki/Germs"
            title="Germs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Germs
          </a>{" "}
          :( He usado{" "}
          <a
            href="https://spotify.github.io/coordinator/"
            title="coördinator"
            target="_blank"
            rel="noopener noreferrer"
          >
            esta herramienta
          </a>{" "}
          de{" "}
          <a
            href="https://twitter.com/alizauf"
            title="Aliza Aufrichtig"
            target="_blank"
            rel="noopener noreferrer"
          >
            @alizauf
          </a>{" "}
          para obtener las coordenadas de cada punto.
        </p>
      ),
    },
  },
  exp_17: {
    id: "exp_17",
    index: 17,
    title: { en: "C64 10 PRINT", es: "C64 10 PRINT" },
    tools: "Canvas",
    info: {
      en: (
        <p>
          <a
            href="https://twitter.com/rumyra"
            title="Ruth John"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruth
          </a>{" "}
          and{" "}
          <a
            href="https://twitter.com/twholman"
            title="Tim Holman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tim
          </a>{" "}
          made a series of{" "}
          <a
            href="https://generativeartistry.com/episodes/"
            title="Generative Artistry"
            target="_blank"
            rel="noopener noreferrer"
          >
            podcasts
          </a>{" "}
          about generative art. This canvas is based on the first of their{" "}
          <a
            href="https://generativeartistry.com/tutorials/tiled-lines/"
            title="Generative Artistry"
            target="_blank"
            rel="noopener noreferrer"
          >
            tutorials
          </a>
          .
        </p>
      ),
      es: (
        <p>
          <a
            href="https://twitter.com/rumyra"
            title="Ruth John"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruth
          </a>{" "}
          y{" "}
          <a
            href="https://twitter.com/twholman"
            title="Tim Holman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tim
          </a>{" "}
          han creado una serie de{" "}
          <a
            href="https://generativeartistry.com/episodes/"
            title="Generative Artistry"
            target="_blank"
            rel="noopener noreferrer"
          >
            podcasts
          </a>{" "}
          sobre arte generativo. Este canvas está basado en el primero de sus{" "}
          <a
            href="https://generativeartistry.com/tutorials/tiled-lines/"
            title="Generative Artistry"
            target="_blank"
            rel="noopener noreferrer"
          >
            tutoriales
          </a>
          .
        </p>
      ),
    },
  },
  exp_18: {
    id: "exp_18",
    index: 18,
    title: { en: "Cosmic Mystery", es: "Misterio Cósmico" },
    tools: "Canvas, svg, R3F, react-spring",
    info: {
      en: (
        <p>
          Kepler's{" "}
          <a
            href="https://en.wikipedia.org/wiki/Mysterium_Cosmographicum"
            title="Mysterium Cosmographicum"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mysterium Cosmographicum
          </a>
          .
        </p>
      ),
      es: (
        <p>
          <a
            href="https://es.wikipedia.org/wiki/Mysterium_Cosmographicum"
            title="Germs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            El Misterio Cosmográfico
          </a>{" "}
          de Johannes Kepler.
        </p>
      ),
    },
  },
  exp_19: {
    id: "exp_19",
    index: 19,
    title: { en: "COVID deaths, Spain", es: "Muertes por COVID" },
    tools: "Canvas, svg, d3",
    info: {
      en: (
        <p>
          Click or tap on each square. Source:{" "}
          <a
            href="https://github.com/datadista/datasets/tree/master/COVID%2019"
            title="COVID-19 Datadista"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datadista.
          </a>
        </p>
      ),
      es: (
        <p>
          Haz click en cada CC. AA. para desplegar más datos. Fuente:{" "}
          <a
            href="https://github.com/datadista/datasets/tree/master/COVID%2019"
            title="COVID-19 Datadista"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datadista.
          </a>
        </p>
      ),
    },
  },
  exp_20: {
    id: "exp_20",
    index: 20,
    title: { en: "EsCovid19Data", es: "EsCovid19Data" },
    tools: "Canvas, svg, d3",
    info: {
      en: (
        <p>
          Source:{" "}
          <a
            href="https://github.com/montera34/escovid19data"
            title="COVID-19 Datadista"
            target="_blank"
            rel="noopener noreferrer"
          >
            EsCovid19.
          </a>
        </p>
      ),
      es: (
        <p>
          Fuente:{" "}
          <a
            href="https://github.com/montera34/escovid19data"
            title="COVID-19 EsCovid19"
            target="_blank"
            rel="noopener noreferrer"
          >
            EsCovid19.
          </a>
        </p>
      ),
    },
  },
  exp_21: {
    id: "exp_21",
    index: 21,
    title: { en: "GLSL shader", es: "GLSL shader" },
    tools: "webgl, three.js, react-three-fiber",
    info: {
      en: (
        <p>
          First shader. Check out{" "}
          <a
            href="https://twitter.com/akella"
            title="@akella twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yuri Artiukh
          </a>{" "}
          live coding sessions on{" "}
          <a
            href="https://www.youtube.com/channel/UCDo7RTzizoOdPjY8A-xDR7g"
            title="Yuri Artyukh channel on youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube
          </a>
          .
        </p>
      ),
      es: (
        <p>
          Primer shader siguiendo una{" "}
          <a
            href="https://www.youtube.com/channel/UCDo7RTzizoOdPjY8A-xDR7g"
            title="Yuri Artyukh channel on youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            sesión de código en directo
          </a>{" "}
          de{" "}
          <a
            href="https://twitter.com/akella"
            title="@akella twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yuri Artiukh
          </a>
          .
        </p>
      ),
    },
  },
  exp_22: {
    id: "exp_22",
    index: 22,
    title: { en: "Colors of noise", es: "Color del ruido" },
    tools: "use-sound, react-spring",

    info: {
      en: (
        <p>
          Click to play.{" "}
          <a
            href="https://en.wikipedia.org/wiki/Colors_of_noise"
            title="wikipedia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia article
          </a>
          .{" "}
        </p>
      ),
      es: (
        <p>
          Haz click o toca para reproducir.{" "}
          <a
            href="https://es.wikipedia.org/wiki/Ruido_de_color"
            title="wikipedia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Artículo en wikipedia
          </a>
          .{" "}
        </p>
      ),
    },
  },
  exp_23: {
    id: "exp_23",
    index: 23,
    title: { en: "Points on a sphere", es: "Puntos en una esfera" },
    tools: "three.js, R3F, react-spring",
    info: {
      en: (
        <p>
          1082 nodes on a sphere,{" "}
          <a
            href="http://www.softimageblog.com/archives/115"
            title="Softimage Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            two algorithms
          </a>{" "}
          to uniformly distribute points,{" "}
          <a
            href="http://neilsloane.com/icosahedral.codes/"
            title="Neil Sloane"
            target="_blank"
            rel="noopener noreferrer"
          >
            precomputed values
          </a>{" "}
          with icosahedral symmetry, and one{" "}
          <a
            href="https://observablehq.com/@rreusser/equally-distributing-points-on-a-sphere"
            title="Observable"
            target="_blank"
            rel="noopener noreferrer"
          >
            random function
          </a>
          . Select one from the top left menu, zoom, pan and rotate.
        </p>
      ),
      es: (
        <p>
          1082 nodos en una esfera,{" "}
          <a
            href="http://www.softimageblog.com/archives/115"
            title="Softimage Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            dos algoritmos
          </a>{" "}
          para distribuir puntos uniformemente,{" "}
          <a
            href="http://neilsloane.com/icosahedral.codes/"
            title="Neil Sloane"
            target="_blank"
            rel="noopener noreferrer"
          >
            valores precomputados
          </a>{" "}
          con simetría icosaédrica, y una{" "}
          <a
            href="https://observablehq.com/@rreusser/equally-distributing-points-on-a-sphere"
            title="Observable"
            target="_blank"
            rel="noopener noreferrer"
          >
            función aleatoria
          </a>
          . Selecciona en el menú superior izquierdo, amplía, desplaza y rota.
        </p>
      ),
    },
  },
  exp_24: {
    id: "exp_24",
    index: 24,
    title: { en: "SDF #420", es: "SDF #420" },
    tools: "glsl, three.js, R3F",
    info: {
      en: (
        <p>
          <a
            href="https://mathworld.wolfram.com/CannabisCurve.html"
            title="Math World"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cannabis curve
          </a>{" "}
          signed distance field.{" "}
          <span
            style={{ opacity: "0.6" }}
          >{`r = arcsin({0.5 + 0.5 cos 8θ}) ({0.5 + 0.5 cos θ})`}</span>{" "}
          Includes glsl functions from{" "}
          <a
            href="https://patriciogonzalezvivo.github.io/PixelSpiritDeck/"
            title="Pixel Spirit Deck"
            target="_blank"
            rel="noopener noreferrer"
          >
            PixelSpirit Deck
          </a>{" "}
          by{" "}
          <a
            href="https://twitter.com/patriciogv"
            title="Twitter @patriciogv"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patricio González Vivo
          </a>
          .{" "}
        </p>
      ),
      es: (
        <p>
          Función de distancia con signo de la{" "}
          <a
            href="https://mathworld.wolfram.com/CannabisCurve.html"
            title="Math World"
            target="_blank"
            rel="noopener noreferrer"
          >
            curva del cannabis
          </a>
          :{" "}
          <span
            style={{ opacity: "0.6" }}
          >{`r = arcsin({0.5 + 0.5 cos 8θ}) ({0.5 + 0.5 cos θ})`}</span>{" "}
          Incluye funciones de{" "}
          <a
            href="https://twitter.com/patriciogv"
            title="Twitter @patriciogv"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patricio González Vivo
          </a>
          .{" "}
        </p>
      ),
    },
  },
  exp_25: {
    id: "exp_25",
    index: 25,
    title: { en: "AENA", es: "AENA" },
    tools: "glsl, three.js, R3F",
    info: {
      en: (
        <p>
          Domestic traffic in spanish airports. 2019. + 5,000 pax/year. Source:{" "}
          <a
            href="http://www.aena.es/csee/Satellite?pagename=Estadisticas/Home"
            title="Aena Stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aena
          </a>
          .
        </p>
      ),
      es: (
        <p>
          Tráfico doméstico en aeropuertos españoles durante 2019. Pasajeros
          anuales. No se incluyen rutas con menos de 5.000 pasajeros. Fuente:{" "}
          <a
            href="http://www.aena.es/csee/Satellite?pagename=Estadisticas/Home"
            title="Aena Stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aena
          </a>
          .
        </p>
      ),
    },
  },
  exp_26: {
    id: "exp_26",
    index: 26,
    title: { en: "Squircles", es: "Squircles" },
    tools: "THREE.JS, R3F",
    info: {
      en: (
        <p>
          {" "}
          Based on this{" "}
          <a
            href="https://www.youtube.com/watch?v=jtXnN6-ezms"
            title="@akella twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            live coding session by Yuri Artiukh.
          </a>
        </p>
      ),
      es: (
        <p>
          {" "}
          Basado en esta{" "}
          <a
            href="https://www.youtube.com/watch?v=jtXnN6-ezms"
            title="@akella twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            sesión de código en directo
          </a>{" "}
          de Yuri Artiukh.
        </p>
      ),
    },
  },
  exp_27: {
    id: "exp_27",
    index: 27,
    title: { en: "World population", es: "Población mundial" },
    tools: "Three.js, R3F",
    info: {
      en: (
        <p>
          <span style={{ color: "RGBA(80, 161, 138, 1.00)" }}> ■ </span> Each
          square represents 500,000 people. WebGL version of Max Roser's{" "}
          <a
            href="https://ourworldindata.org/world-population-cartogram"
            title="Our world in data"
            target="_blank"
            rel="noopener noreferrer"
          >
            World Population Cartogram.
          </a>{" "}
          Source:{" "}
          <a
            href="https://github.com/mattdzugan/World-Population-Cartogram"
            title="Matt Duzgan on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Matt Duzgan,
          </a>{" "}
          <a
            href="https://www.un.org/development/desa/pd/"
            title="UN Population Division"
            target="_blank"
            rel="noopener noreferrer"
          >
            UN Population Division 2018.
          </a>{" "}
        </p>
      ),
      es: (
        <p>
          <span style={{ color: "RGBA(80, 161, 138, 1.00)" }}> ■ </span>Cada
          cuadrado representa 500.000 personas. Versión WebGL del cartograma de
          Max Roser para{" "}
          <a
            href="https://ourworldindata.org/world-population-cartogram"
            title="Our world in data"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Our World in Data.
          </a>{" "}
          Fuente:{" "}
          <a
            href="https://github.com/mattdzugan/World-Population-Cartogram"
            title="Matt Duzgan on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Matt Duzgan,
          </a>{" "}
          <a
            href="https://www.un.org/development/desa/pd/"
            title="UN Population Division"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Naciones Unidas 2018.
          </a>{" "}
        </p>
      ),
    },
  },
  exp_28: {
    id: "exp_28",
    index: 28,
    title: { en: "Mobility study I", es: "Estudio de movilidad I" },
    tools: "THREE.JS, R3F",
    info: {
      en: (
        <p>
          Source:{" "}
          <a
            href="https://www.ine.es/en/experimental/movilidad/experimental_em_en.htm"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            INE,
          </a>{" "}
          EM1-{" "}
          <a
            href="https://www.ine.es/en/prensa/experimental_em1_en.pdf"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pilot study
          </a>{" "}
          on mobility based on mobile phone.
        </p>
      ),
      es: (
        <p>
          Movilidad a partir de datos de telefonía móvil durante noviembre de
          2019. Cada círculo, escalado según su área, representa el volumen de
          tráfico entre las 3.214 zonas de movilidad. Los círculos estáticos
          representan el movimiento dentro de la misma área. Fuente:{" "}
          <a
            href="https://www.ine.es/experimental/movilidad/experimental_em.htm"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            INE,
          </a>{" "}
          EM1-{" "}
          <a
            href="https://www.ine.es/experimental/movilidad/exp_em1_proyecto.pdf"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Estudio piloto
          </a>{" "}
          de movilidad.
        </p>
      ),
    },
  },
  exp_29: {
    id: "exp_29",
    index: 29,
    title: { en: "Mobility study II", es: "Estudio de movilidad II" },
    tools: "THREE.JS, R3F",
    info: {
      en: (
        <p>
          Source:{" "}
          <a
            href="https://www.ine.es/en/experimental/movilidad/experimental_em_en.htm"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            INE,
          </a>{" "}
          Study of the mobility of the population during the alert state period.
        </p>
      ),
      es: (
        <p>
          Fuente.{" "}
          <a
            href="https://www.ine.es/experimental/movilidad/experimental_em.htm"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            INE,
          </a>{" "}
          Estudio de movilidad durante el estado de alarma por COVID-19. Cada
          círculo, escalado según su área, se desplaza entre los centroides de
          origen y destino de cada zona de movilidad. No es comparable con{" "}
          <a
            href="https://iguacel.github.io/iguacel/#/exp/28"
            title="INE"
            target="_blank"
            rel="noopener noreferrer"
          >
            el gráfico anterior
          </a>
          , ya que en este estudio no se incluye el tráfico interno dentro cada
          área.
        </p>
      ),
    },
  },
};
