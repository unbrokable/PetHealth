import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { createMenuItem } from "../../utils/functions";
import { MenuItem } from "../../utils/types";

const lngs = {
  en: { nativeName: "English" },
  uk: { nativeName: "Українська" },
};

const AuthorizeMenu = () => {
  const { t, i18n } = useTranslation();

  const items: MenuItem[] = [
    createMenuItem({ icon: <Link to="/registration">{t("menu.r")}</Link> }),
    createMenuItem({ icon: <Link to="/login">{t("menu.s")}</Link> }),
    createMenuItem({
      icon: t("menu.l"),
      children: [
        ...Object.keys(lngs).map((lng) =>
          createMenuItem({
            onClick: () => i18n.changeLanguage(lng),
            key: lng,
            style: {
              color: "white",
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            },
            icon: (lngs as any)[lng].nativeName,
          })
        ),
      ],
    }),
  ];

  return (
    <>
      <Menu items={items} theme="dark" mode="horizontal" direction="rtl" />
    </>
  );
};

export default AuthorizeMenu;
