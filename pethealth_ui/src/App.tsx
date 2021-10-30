import React, { useEffect } from "react";
import "./App.css";
import { ConfigProvider, Layout } from "antd";

import { Switch } from "react-router-dom";
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
import Clinic from "./features/owner/Clinic";
import ClinicAddPet from "./features/owner/ClinicAddPet";

import ukUA from "antd/lib/locale/uk_UA";
import enUS from "antd/lib/locale/en_US";
import { useTranslation } from "react-i18next";

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
          <Content style={{ padding: "20px 50px" }}>
            <Switch>
              <PublicRoute path="/login">
                <Login />
              </PublicRoute>
              <PublicRoute path="/registration">
                <Registration />
              </PublicRoute>
              {/* admin */}
              <PrivateRoute path="/users">
                <Users />
              </PrivateRoute>
              {/* owner */}
              <PrivateRoute path="/clinic/addpet">
                <ClinicAddPet />
              </PrivateRoute>
              <PrivateRoute path="/clinic">
                <Clinic />
              </PrivateRoute>
              {/* user */}
              <PrivateRoute path="/pets">
                <Pets />
              </PrivateRoute>
              <PrivateRoute path="/pet/:id">
                <Pet />
              </PrivateRoute>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {/* Ant Design ©2018 Created by Ant UED */}
          </Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
