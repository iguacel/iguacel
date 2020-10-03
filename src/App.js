import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Loader from "./components/ui/Loader";
import Ui from "./components/Ui";

import { NUM } from "./exp/index";

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
const Exp15 = lazy(() => import("./exp/Exp15"));
const Exp16 = lazy(() => import("./exp/Exp16"));
const Exp17 = lazy(() => import("./exp/Exp17"));
const Exp18 = lazy(() => import("./exp/Exp18"));
const Exp19 = lazy(() => import("./exp/Exp19"));
const Exp20 = lazy(() => import("./exp/Exp20"));
const Exp21 = lazy(() => import("./exp/Exp21"));
const Exp22 = lazy(() => import("./exp/Exp22"));
const Exp23 = lazy(() => import("./exp/Exp23"));
const Exp24 = lazy(() => import("./exp/Exp24"));
const Exp25 = lazy(() => import("./exp/Exp25"));
const Exp26 = lazy(() => import("./exp/Exp26"));

const App = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            <Redirect
              exact
              from="/"
              to={`/exp/${NUM}`}
              component={`Exp${NUM}`}
            />
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
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Ui />
      </Router>
    </div>
  );
};

export default App;
