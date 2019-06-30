import React, { Component, Suspense, lazy } from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../store";

import Loader from "./Loader";
import Navbar from "./Navbar";
import AnimatedSwitch from "./AnimatedSwitch";
import ProtectedRoute from "./ProtectedRoute";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Home = lazy(() => import("./Home"));
const Profile = lazy(() => import("./Profile/Profile"));
const Chat = lazy(() => import("./Chat"));
const ProfileList = lazy(() => import("./ProfileList/ProfileList"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const EditGeneralInfo = lazy(() => import("./Dashboard/EditProfile/EditGeneralInfo"));

class App extends Component {
    render() {
        return (
            <Suspense fallback={<Loader />}>
                <Provider store={store}>
                    <PersistGate loading={<Loader />} persistor={persistor}>
                        <Router history={history}>
                            <React.Fragment>
                                <Navbar />
                                <Suspense fallback={<Loader />}>
                                    <AnimatedSwitch>
                                        <Route
                                            exact
                                            path="/"
                                            component={Home}
                                        />
                                        <Route
                                            exact
                                            path="/login"
                                            component={Login}
                                        />
                                        <Route
                                            exact
                                            path="/register"
                                            component={Register}
                                        />
                                        <Route
                                            exact
                                            path="/profiles"
                                            component={ProfileList}
                                        />
                                        <Route
                                            path="/profile/:id"
                                            component={Profile}
                                        />
                                        <ProtectedRoute
                                            exact
                                            path="/chat"
                                            component={Chat}
                                        />
                                        <ProtectedRoute
                                            path="/chat/:id"
                                            component={Chat}
                                        />
                                        <ProtectedRoute path="/edit1"  component={EditGeneralInfo}/>
                                        <Route
                                            path=""
                                            component={PageNotFound}
                                        />
                                    </AnimatedSwitch>
                                </Suspense>
                            </React.Fragment>
                        </Router>
                    </PersistGate>
                </Provider>
            </Suspense>
        );
    }
}

export default App;
