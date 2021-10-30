import { Button, Table } from "antd";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link, Route, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadUserPetsAsync, selectPets } from "../../app/slice/user/petsSlice";
import PetAdd from "./PetAdd";

const Pets = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPets);
  const history = useHistory();
  const { path } = useRouteMatch();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Kind",
      dataIndex: "kind",
    },
    {
      title: "Birthday",
      dataIndex: "birthDay",
      render: (dateS: string) => {
        const date = new Date(dateS);
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      title: "",
      render: (row: any) => {
        return (
          <>
            <Link to={`/pet/${row.id}`}>Detail</Link>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if (!state.pets) {
      dispatch(loadUserPetsAsync());
    }
  }, [dispatch, state.pets]);

  return (
    <>
      <Switch>
        <Route exact path={`${path}/add`}>
          <PetAdd />
        </Route>
      </Switch>
      <Table
        dataSource={state.pets ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Button type="primary" onClick={() => history.push(`${path}/add`)}>
        Add
      </Button>
    </>
  );
};

export default Pets;
