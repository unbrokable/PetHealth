import { Button, Col, Row, Table } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadRemovedUsersAsync,
  loadUsersAsync,
  recoveUserAsync,
  removeUserAsync,
  selectUsers,
  setshowUsers,
} from "../../app/slice/admin/usersSlice";
import UserAdd from "./UserAdd";

const Users = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectUsers);
  const history = useHistory();
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  const columns = [
    {
      title: t("common.i"),
      dataIndex: "id",
    },
    {
      title: t("common.n"),
      dataIndex: "name",
    },
    {
      title: t("common.e"),
      dataIndex: "email",
    },
    {
      title: t("common.r"),
      dataIndex: "role",
    },
    state.showUsers
      ? {
          title: "",
          render: (row: any) => {
            return (
              <>
                <Button
                  onClick={() => {
                    dispatch(removeUserAsync(row.id));
                  }}
                >
                  {t("common.rem")}
                </Button>
              </>
            );
          },
        }
      : {
          title: "",
          render: (row: any) => {
            return (
              <>
                <Button
                  onClick={() => {
                    dispatch(recoveUserAsync(row.id));
                  }}
                >
                  {t("common.rec")}
                </Button>
              </>
            );
          },
        },
  ];

  useEffect(() => {
    if (!state.users) {
      dispatch(loadUsersAsync());
    }
  }, [dispatch, state.users]);

  useEffect(() => {
    if (!state.removedUser) {
      dispatch(loadRemovedUsersAsync());
    }
  }, [dispatch, state.removedUser]);

  return (
    <>
      <Switch>
        <Route exact path={`${path}/add`}>
          <UserAdd />
        </Route>
      </Switch>
      <Row>
        <Col>
          <Button onClick={() => dispatch(setshowUsers(true))}>
            {t("users.s")}
          </Button>
        </Col>
        <Col>
          <Button onClick={() => dispatch(setshowUsers(false))}>
            {t("users.sr")}
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={(state.showUsers ? state.users : state.removedUser) ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Button type="primary" onClick={() => history.push(`${path}/add`)}>
        {t("common.a")}
      </Button>
    </>
  );
};

export default Users;
