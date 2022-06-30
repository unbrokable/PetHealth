import { Button, Col, Divider, Row, Table } from "antd";
import { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { jwtService } from "../../app/jwtService";
import { RoleType } from "../../app/slice/AuthorizeSlice";
import { selectPet, setPet } from "../../app/slice/user/petSlice";
import ClinicRecordAdd from "../owner/ClinicRecordAdd";

const Pet = () => {
  const isOwner = RoleType[RoleType.Owner] === jwtService.getRole();
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPet);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
    },
    {
      title: "Pulse",
      dataIndex: "Pulse",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date: string) => {
        return <>{new Date(date).toLocaleString()} </>;
      },
    },
    {
      title: "",
      render: (row: any) => {
        return (
          <>
            <Link to={`pet/${row.id}`}>Detail</Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (!id || +id !== +state.id!) {
      dispatch(setPet(id));
    }
  });

  return (
    <>
      <Switch>
        <Route path={path + "/addrecord"}>
          <ClinicRecordAdd id={id} />
        </Route>
      </Switch>
      <Divider orientation="center">Pet Name</Divider>
      <Row>
        <Col span={24}>
          <h3 style={{ textAlign: "center" }}>{state.name}</h3>
        </Col>
      </Row>
      <Table
        dataSource={state.records ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      {isOwner ? (
        <Button
          onClick={() => {
            history.push(url + "/addrecord");
          }}
        >
          Add
        </Button>
      ) : null}
    </>
  );
};

export default Pet;
