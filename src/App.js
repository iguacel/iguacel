import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
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

const App = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            <Redirect exact from="/" to={`/exp/${NUM}`} component={`Exp${NUM}`} />
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

           }
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Ui />
      </Router>
    </div>
  );
};

export default App;
