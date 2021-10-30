import { Button, Menu } from "antd";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

const lngs = {
  en: { nativeName: "English" },
  uk: { nativeName: "Українська" },
};

const AuthorizeMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Menu theme="dark" mode="horizontal" direction="rtl">
        <Menu.Item>
          <Link to="/login">{t("menu.s")}</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/registration">{t("menu.r")}</Link>
        </Menu.Item>

        <SubMenu style={{ float: "left" }} title={t("menu.l")}>
          {Object.keys(lngs).map((lng) => (
            <Menu.Item
              onClick={() => i18n.changeLanguage(lng)}
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
            >
              {(lngs as any)[lng].nativeName}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </>
  );
};

export default AuthorizeMenu;
