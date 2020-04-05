import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";

const Waypoints = () => {
  const [on, toggle] = useState(false);

  const animation = useSpring({
    opacity: on ? 1 : 0,
    transform: on ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
    config: config.molasses
  });

  return (
    <div className="waypoints">
      <p>
        Lorem ipsum dolor amet poutine pitchfork tattooed venmo, heirloom cliche
        chartreuse gentrify mumblecore hammock single-origin coffee banh mi.
        Sartorial unicorn 90's edison bulb iPhone. Leggings pickled brunch
        neutra tousled. Occupy fixie affogato pinterest vaporware aesthetic, tbh
        subway tile hammock next level prism vape lomo taiyaki kale chips.
        Jianbing knausgaard taxidermy squid artisan thundercats, gochujang
        subway tile air plant taiyaki master cleanse cray.
      </p>
      <p>
        Pug godard pour-over 90's direct trade, PBR&B +1 next level organic
        edison bulb quinoa DIY. Taiyaki sriracha unicorn, cronut taxidermy
        chicharrones four dollar toast keytar cold-pressed raclette yuccie cray
        iceland. Roof party knausgaard neutra plaid, pork belly chambray banh mi
        chia. Blue bottle narwhal iceland health goth cornhole fam humblebrag
        flannel pitchfork pickled.
      </p>

      <div>
        <Waypoint
          onEnter={() => {
            if (!on) toggle(!on);
          }}
          topOffset="-30%"
        />
      </div>

      <animated.p style={{ ...animation, color: "tomato" }}>
        Jianbing lomo lumbersexual put a bird on it fixie next level pitchfork
        gentrify, disrupt echo park. Hot chicken subway tile drinking vinegar
        fixie. YOLO keytar gluten-free artisan live-edge four loko cred man
        braid food truck leggings. Health goth semiotics kogi heirloom authentic
        hell of. Pork belly helvetica cornhole gentrify microdosing austin
        chillwave pitchfork paleo cred raclette venmo vegan fashion axe +1.
      </animated.p>

      <p>
        Craft beer tousled ennui ugh, williamsburg stumptown flexitarian plaid
        activated charcoal. Taxidermy letterpress glossier 8-bit, organic
        bitters coloring book. Selvage lo-fi typewriter wolf ugh, lyft four loko
        chillwave bitters mustache tumblr copper mug subway tile. Fanny pack
        aesthetic taiyaki vice sustainable mustache. Asymmetrical shabby chic
        DIY authentic normcore man braid you probably haven't heard of them.
        Mustache humblebrag umami beard williamsburg. Prism hexagon VHS, paleo
        tacos narwhal etsy fashion axe ennui schlitz ethical echo park vinyl.
      </p>
      <p>
        Health goth af scenester irony, farm-to-table austin intelligentsia man
        bun celiac flexitarian yuccie marfa kickstarter banh mi gluten-free.
        Pabst vape bespoke banjo umami next level tumblr offal wolf kombucha.
        Jean shorts direct trade distillery yr glossier dreamcatcher, before
        they sold out butcher. Fixie unicorn leggings pabst forage neutra. 3
        wolf moon microdosing food truck hell of keytar, bitters disrupt flannel
        chartreuse knausgaard affogato ethical pickled. Humblebrag small batch
        meh glossier mixtape.
      </p>
    </div>
  );
};
export default Waypoints;
