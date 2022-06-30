import React, { useEffect } from "react";
import "./App.css";
import { ConfigProvider, Layout } from "antd";

import { Route, Switch } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { jwtService } from "./app/jwtService";
import { setAuthorize, setRole } from "./app/slice/AuthorizeSlice";
import Menu from "./features/menu/Menu";
import PublicRoute from "./features/route/PublicRoute";
import Login from "./features/authorize/Login";
import Registration from "./features/authorize/Registration";
import PrivateRoute from "./features/route/PrivateRoute";
import Users from "./features/admin/Users";
import Pets from "./features/user/Pets";
import Pet from "./features/user/Pet";
import ClinicPets from "./features/owner/ClinicPets";
import ClinicAddPet from "./features/owner/ClinicAddPet";

import ukUA from "antd/lib/locale/uk_UA";
import enUS from "antd/lib/locale/en_US";
import { useTranslation } from "react-i18next";
import PublicClinic from "./features/PublicClinic";
import Clinics from "./features/user/Clinics";
import FooterPage from "./features/FooterPage";
import Chats from "./features/Chats";
import PetsHealth from "./features/user/PetsHealth";

const { Header, Footer, Content } = Layout;
function App() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (jwtService.get()) {
      dispatch(setAuthorize(true));
      dispatch(setRole(jwtService.getRole()));
    }
  });

  useEffect(() => {
    if (!jwtService.get()) {
      dispatch(setAuthorize(false));
    }
  });

  return (
    <>
      <ConfigProvider locale={i18n.resolvedLanguage === "uk" ? ukUA : enUS}>
        <Layout className="layout">
          <Header>
            <Menu />
          </Header>
          <Content
            style={{
              padding: "50px 50px",
              minHeight: 500,
              backgroundColor: "orange",
            }}
          >
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/registration">
                <Registration />
              </Route>

              <PrivateRoute path="/chats">
                <Chats />
              </PrivateRoute>

              {/* admin */}
              <PrivateRoute path="/users">
                <Users />
              </PrivateRoute>
              {/* owner */}
              <PrivateRoute path="/clinic/addpet">
                <ClinicAddPet />
              </PrivateRoute>
              <PrivateRoute path="/clinicpets">
                <ClinicPets />
              </PrivateRoute>
              <PrivateRoute path="/healthreport">
                <PetsHealth />
              </PrivateRoute>
              {/* user */}
              <PrivateRoute path="/pets">
                <Pets />
              </PrivateRoute>
              <PrivateRoute ex path="/clinics/:id">
                <PublicClinic />
              </PrivateRoute>
              <PrivateRoute path="/clinics">
                <Clinics />
              </PrivateRoute>
              <PrivateRoute path="/pet/:id">
                <Pet />
              </PrivateRoute>
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: "black", minHeight: "30em" }}>
            <FooterPage />
          </Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
