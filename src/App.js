import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Burguer from "./components/ui/Burguer";
import Nav from "./components/ui/Nav";
import Loader from "./components/ui/Loader";
import SwitchButton from "./components/ui/SwitchButton";

// VIEWS
const NotFound = React.lazy(() => import("./components/ui/NotFound"));

const Exp1 = lazy(() => import("./exp/Exp1"));
const Exp2 = lazy(() => import("./exp/Exp2"));
const Exp3 = lazy(() => import("./exp/Exp3"));
const Exp4 = lazy(() => import("./exp/Exp4"));
const Exp5 = lazy(() => import("./exp/Exp5"));
const Exp6 = lazy(() => import("./exp/Exp6"));
const Exp7 = lazy(() => import("./exp/Exp7"));
const Exp8 = lazy(() => import("./exp/Exp8"));
const Exp9 = lazy(() => import("./exp/Exp9"));
const Exp10 = lazy(() => import("./exp/Exp10"));
const Exp11 = lazy(() => import("./exp/Exp11"));
const Exp12 = lazy(() => import("./exp/Exp12"));
const Exp13 = lazy(() => import("./exp/Exp13"));
const Exp14 = lazy(() => import("./exp/Exp14"));
// const Exp15 = lazy(() => import("./exp/Exp15"));
// const Exp16 = lazy(() => import("./exp/Exp16"));
// const Exp17 = lazy(() => import("./exp/Exp17"));
// const Exp18 = lazy(() => import("./exp/Exp18"));
// const Exp19 = lazy(() => import("./exp/Exp19"));
// const Exp20 = lazy(() => import("./exp/Exp20"));
// const Exp21 = lazy(() => import("./exp/Exp21"));
// const Exp22 = lazy(() => import("./exp/Exp22"));
// const Exp23 = lazy(() => import("./exp/Exp23"));
// const Exp24 = lazy(() => import("./exp/Exp24"));
// const Exp25 = lazy(() => import("./exp/Exp25"));
// const Exp26 = lazy(() => import("./exp/Exp26"));
// const Exp27 = lazy(() => import("./exp/Exp27"));
// const Exp28 = lazy(() => import("./exp/Exp28"));
// const Exp29 = lazy(() => import("./exp/Exp29"));
// const Exp30 = lazy(() => import("./exp/Exp30"));
// const Exp31 = lazy(() => import("./exp/Exp31"));
// const Exp32 = lazy(() => import("./exp/Exp32"));
// const Exp33 = lazy(() => import("./exp/Exp33"));
// const Exp34 = lazy(() => import("./exp/Exp34"));
// const Exp35 = lazy(() => import("./exp/Exp35"));
// const Exp36 = lazy(() => import("./exp/Exp36"));
// const Exp37 = lazy(() => import("./exp/Exp37"));
// const Exp38 = lazy(() => import("./exp/Exp38"));
// const Exp39 = lazy(() => import("./exp/Exp39"));
// const Exp40 = lazy(() => import("./exp/Exp40"));
// const Exp41 = lazy(() => import("./exp/Exp41"));
// const Exp42 = lazy(() => import("./exp/Exp42"));
// const Exp43 = lazy(() => import("./exp/Exp43"));
// const Exp44 = lazy(() => import("./exp/Exp44"));
// const Exp45 = lazy(() => import("./exp/Exp45"));
// const Exp46 = lazy(() => import("./exp/Exp46"));
// const Exp47 = lazy(() => import("./exp/Exp47"));
// const Exp48 = lazy(() => import("./exp/Exp48"));
// const Exp49 = lazy(() => import("./exp/Exp49"));
// const Exp50 = lazy(() => import("./exp/Exp50"));
// const Exp51 = lazy(() => import("./exp/Exp51"));
// const Exp52 = lazy(() => import("./exp/Exp52"));
// const Exp53 = lazy(() => import("./exp/Exp53"));
// const Exp54 = lazy(() => import("./exp/Exp54"));
// const Exp55 = lazy(() => import("./exp/Exp55"));
// const Exp56 = lazy(() => import("./exp/Exp56"));
// const Exp57 = lazy(() => import("./exp/Exp57"));
// const Exp58 = lazy(() => import("./exp/Exp58"));
// const Exp59 = lazy(() => import("./exp/Exp59"));
// const Exp60 = lazy(() => import("./exp/Exp60"));
// const Exp61 = lazy(() => import("./exp/Exp61"));
// const Exp62 = lazy(() => import("./exp/Exp62"));
// const Exp63 = lazy(() => import("./exp/Exp63"));
// const Exp64 = lazy(() => import("./exp/Exp64"));
// const Exp65 = lazy(() => import("./exp/Exp65"));
// const Exp66 = lazy(() => import("./exp/Exp66"));
// const Exp67 = lazy(() => import("./exp/Exp67"));
// const Exp68 = lazy(() => import("./exp/Exp68"));
// const Exp69 = lazy(() => import("./exp/Exp69"));
// const Exp70 = lazy(() => import("./exp/Exp70"));
// const Exp71 = lazy(() => import("./exp/Exp71"));
// const Exp72 = lazy(() => import("./exp/Exp72"));
// const Exp73 = lazy(() => import("./exp/Exp73"));
// const Exp74 = lazy(() => import("./exp/Exp74"));
// const Exp75 = lazy(() => import("./exp/Exp75"));
// const Exp76 = lazy(() => import("./exp/Exp76"));
// const Exp77 = lazy(() => import("./exp/Exp77"));
// const Exp78 = lazy(() => import("./exp/Exp78"));
// const Exp79 = lazy(() => import("./exp/Exp79"));
// const Exp80 = lazy(() => import("./exp/Exp80"));
// const Exp81 = lazy(() => import("./exp/Exp81"));
// const Exp82 = lazy(() => import("./exp/Exp82"));
// const Exp83 = lazy(() => import("./exp/Exp83"));
// const Exp84 = lazy(() => import("./exp/Exp84"));
// const Exp85 = lazy(() => import("./exp/Exp85"));
// const Exp86 = lazy(() => import("./exp/Exp86"));
// const Exp87 = lazy(() => import("./exp/Exp87"));
// const Exp88 = lazy(() => import("./exp/Exp88"));
// const Exp89 = lazy(() => import("./exp/Exp89"));
// const Exp90 = lazy(() => import("./exp/Exp90"));
// const Exp91 = lazy(() => import("./exp/Exp91"));
// const Exp92 = lazy(() => import("./exp/Exp92"));
// const Exp93 = lazy(() => import("./exp/Exp93"));
// const Exp94 = lazy(() => import("./exp/Exp94"));
// const Exp95 = lazy(() => import("./exp/Exp95"));
// const Exp96 = lazy(() => import("./exp/Exp96"));
// const Exp97 = lazy(() => import("./exp/Exp97"));
// const Exp98 = lazy(() => import("./exp/Exp98"));
// const Exp99 = lazy(() => import("./exp/Exp99"));
// const Exp100 = lazy(() => import("./exp/Exp100"));

const App = () => {
  return (
    <div>
      <Router>
        <Burguer />
        <SwitchButton />
        <Nav />
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            <Redirect exact from="/" to="/exp/1" component={Exp1} />
            <Route path="/exp/1" component={Exp1} />
            <Route path="/exp/2" component={Exp2} />
            <Route path="/exp/3" component={Exp3} />
            <Route path="/exp/4" component={Exp4} />
            <Route path="/exp/5" component={Exp5} />
            <Route path="/exp/6" component={Exp6} />
            <Route path="/exp/7" component={Exp7} />
            <Route path="/exp/8" component={Exp8} />
            <Route path="/exp/9" component={Exp9} />
            <Route path="/exp/10" component={Exp10} />
            <Route path="/exp/11" component={Exp11} />
            <Route path="/exp/12" component={Exp12} />
            <Route path="/exp/13" component={Exp13} />
            <Route path="/exp/14" component={Exp14} />
            {/*
            <Route path="/exp/15" component={Exp15} />
            <Route path="/exp/16" component={Exp16} />
            <Route path="/exp/17" component={Exp17} />
            <Route path="/exp/18" component={Exp18} />
            <Route path="/exp/19" component={Exp19} />
            <Route path="/exp/20" component={Exp20} />
            <Route path="/exp/21" component={Exp21} />
            <Route path="/exp/22" component={Exp22} />
            <Route path="/exp/23" component={Exp23} />
            <Route path="/exp/24" component={Exp24} />
            <Route path="/exp/25" component={Exp25} />
            <Route path="/exp/26" component={Exp26} />
            <Route path="/exp/27" component={Exp27} />
            <Route path="/exp/28" component={Exp28} />
            <Route path="/exp/29" component={Exp29} />
            <Route path="/exp/30" component={Exp30} />
            <Route path="/exp/31" component={Exp31} />
            <Route path="/exp/32" component={Exp32} />
            <Route path="/exp/33" component={Exp33} />
            <Route path="/exp/34" component={Exp34} />
            <Route path="/exp/35" component={Exp35} />
            <Route path="/exp/36" component={Exp36} />
            <Route path="/exp/37" component={Exp37} />
            <Route path="/exp/38" component={Exp38} />
            <Route path="/exp/39" component={Exp39} />
            <Route path="/exp/40" component={Exp40} />
            <Route path="/exp/41" component={Exp41} />
            <Route path="/exp/42" component={Exp42} />
            <Route path="/exp/43" component={Exp43} />
            <Route path="/exp/44" component={Exp44} />
            <Route path="/exp/45" component={Exp45} />
            <Route path="/exp/46" component={Exp46} />
            <Route path="/exp/47" component={Exp47} />
            <Route path="/exp/48" component={Exp48} />
            <Route path="/exp/49" component={Exp49} />
            <Route path="/exp/50" component={Exp50} />
            <Route path="/exp/51" component={Exp51} />
            <Route path="/exp/52" component={Exp52} />
            <Route path="/exp/53" component={Exp53} />
            <Route path="/exp/54" component={Exp54} />
            <Route path="/exp/55" component={Exp55} />
            <Route path="/exp/56" component={Exp56} />
            <Route path="/exp/57" component={Exp57} />
            <Route path="/exp/58" component={Exp58} />
            <Route path="/exp/59" component={Exp59} />
            <Route path="/exp/60" component={Exp60} />
            <Route path="/exp/61" component={Exp61} />
            <Route path="/exp/62" component={Exp62} />
            <Route path="/exp/63" component={Exp63} />
            <Route path="/exp/64" component={Exp64} />
            <Route path="/exp/65" component={Exp65} />
            <Route path="/exp/66" component={Exp66} />
            <Route path="/exp/67" component={Exp67} />
            <Route path="/exp/68" component={Exp68} />
            <Route path="/exp/69" component={Exp69} />
            <Route path="/exp/70" component={Exp70} />
            <Route path="/exp/71" component={Exp71} />
            <Route path="/exp/72" component={Exp72} />
            <Route path="/exp/73" component={Exp73} />
            <Route path="/exp/74" component={Exp74} />
            <Route path="/exp/75" component={Exp75} />
            <Route path="/exp/76" component={Exp76} />
            <Route path="/exp/77" component={Exp77} />
            <Route path="/exp/78" component={Exp78} />
            <Route path="/exp/79" component={Exp79} />
            <Route path="/exp/80" component={Exp80} />
            <Route path="/exp/81" component={Exp81} />
            <Route path="/exp/82" component={Exp82} />
            <Route path="/exp/83" component={Exp83} />
            <Route path="/exp/84" component={Exp84} />
            <Route path="/exp/85" component={Exp85} />
            <Route path="/exp/86" component={Exp86} />
            <Route path="/exp/87" component={Exp87} />
            <Route path="/exp/88" component={Exp88} />
            <Route path="/exp/89" component={Exp89} />
            <Route path="/exp/90" component={Exp90} />
            <Route path="/exp/91" component={Exp91} />
            <Route path="/exp/92" component={Exp92} />
            <Route path="/exp/93" component={Exp93} />
            <Route path="/exp/94" component={Exp94} />
            <Route path="/exp/95" component={Exp95} />
            <Route path="/exp/96" component={Exp96} />
            <Route path="/exp/97" component={Exp97} />
            <Route path="/exp/98" component={Exp98} />
            <Route path="/exp/99" component={Exp99} />
            <Route path="/exp/100" component={Exp100} /> */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
