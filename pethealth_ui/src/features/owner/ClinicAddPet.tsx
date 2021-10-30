import { Button, Col, Form, Input, Row, Table } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addPetToClinicAsync,
  loadPetsForClinicAsync,
  selectClinicPetAdd,
  setFilterName,
} from "../../app/slice/owner/clinicPetAdd";

const ClinicAddPet = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectClinicPetAdd);

  useEffect(() => {
    if (!state.pets) {
      dispatch(loadPetsForClinicAsync(state.filterName));
    }
  });

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
            <Button
              onClick={() => {
                dispatch(addPetToClinicAsync(row.id));
              }}
            >
              Add
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <Form.Item label="Filter name" name="name">
            <Input
              value={state.filterName}
              onChange={(e) => dispatch(setFilterName(e.target.value))}
            />
          </Form.Item>
        </Col>
        <Col>
          <Button
            onClick={() => {
              dispatch(loadPetsForClinicAsync(state.filterName));
            }}
          >
            Filter
          </Button>
        </Col>
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

export default ClinicAddPet;
