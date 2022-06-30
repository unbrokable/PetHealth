import { Button, Col, Divider, Row, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getReport } from "../../app/api/clinicsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadClinicPetsAsync,
  removePetFromClinicAsync,
  selectClinic,
} from "../../app/slice/owner/clinicSlice";
import { PetElementState } from "../../app/slice/user/petsSlice";

const ClinicPets = () => {
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
    {
      title: "",
      render: (row: PetElementState) => {
        return (
          <>
            <Button
              danger
              onClick={() => dispatch(removePetFromClinicAsync(row.id))}
            >
              Discharge
            </Button>
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
      <Divider orientation="center">Pets in clinics</Divider>
      <Table
        dataSource={state.pets ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Button danger onClick={() => getReport()}>
        Get Report
      </Button>
    </>
  );
};

export default ClinicPets;
