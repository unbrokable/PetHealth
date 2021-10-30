import { jwtService } from "../../app/jwtService";
import { RoleType, selectAuthorize } from "../../app/slice/AuthorizeSlice";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import AuthorizeMenu from "./AuthorizeMenu";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
import {
  selectNotification,
  setError,
  setMessage,
} from "../../app/slice/notificationSlice";
import { notification } from "antd";
import OwnerMenu from "./OwnerMenu";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAuthorize);
  const notifications = useAppSelector(selectNotification);
  const { t } = useTranslation();
  const openErrorNotification = () => {
    notification["error"]({
      message: "Error",
      description: t("error." + notifications.errorMessage),
    });
    dispatch(setError(undefined));
  };

  const openNotification = () => {
    notification["success"]({
      message: "Attention",
      description: notifications.message,
    });
    dispatch(setMessage(undefined));
  };

  return (
    <>
      {/* {state.isAuthorize ? null : <Redirect to="/login" />} */}
      {!!notifications.errorMessage ? openErrorNotification() : null}
      {!!notifications.message ? openNotification() : null}
      {jwtService.get() || state.isAuthorize ? (
        state.role === RoleType[RoleType.Admin] ? (
          <AdminMenu />
        ) : state.role === RoleType[RoleType.Owner] ? (
          <OwnerMenu />
        ) : (
          <UserMenu />
        )
      ) : (
        <AuthorizeMenu />
      )}
    </>
  );
};

export default Menu;
