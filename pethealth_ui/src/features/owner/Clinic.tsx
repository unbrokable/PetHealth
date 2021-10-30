import { Col, Row, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadClinicPetsAsync,
  selectClinic,
} from "../../app/slice/owner/clinicSlice";

const Clinic = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectClinic);

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
    if (!state.pets) {
      dispatch(loadClinicPetsAsync());
    }
  });

  return (
    <>
      <Row>
        <Col>Pets in clinics</Col>
      </Row>
      <Table
        dataSource={state.pets ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default Clinic;
