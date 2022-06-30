import { Button, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { jwtService } from "../../app/jwtService";
import { resertUser } from "../../app/slice/AuthorizeSlice";
import { createMenuItem } from "../../utils/functions";
import { MenuItem } from "../../utils/types";

const UserMenu = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const items: MenuItem[] = [
    createMenuItem({ icon: <Link to="/pets">Pets</Link> }),
    createMenuItem({ icon: <Link to="/healthreport">HealthReport</Link> }),
    createMenuItem({ icon: <Link to="/clinics">Clinics</Link> }),
    createMenuItem({ icon: <Link to="/chats">Chats</Link> }),
    createMenuItem({
      icon: (
        <Button
          type="text"
          style={{ color: "white" }}
          onClick={() => {
            jwtService.remove();
            dispatch(resertUser());
            history.push("/login");
          }}
        >
          Log out
        </Button>
      ),
    }),
  ];
  return (
    <>
      <Menu items={items} theme="dark" mode="horizontal" direction="rtl" />
    </>
  );
};

export default UserMenu;
