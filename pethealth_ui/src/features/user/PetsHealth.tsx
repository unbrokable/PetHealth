import { Divider, Table, Tag } from "antd";
import { useGetPetsHealthQuery } from "../../app/api/petsApi";
import { PetHealthReport } from "../../app/types/PetHealthReport";

const PetsHealth = () => {
  const { data, isLoading } = useGetPetsHealthQuery("");
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
      title: "Condition",
      render: (record: PetHealthReport) => {
        const color = record.condition === "Good" ? "green" : "red";
        return (
          <>
            <Tag color={color}>{record.condition}</Tag>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Divider orientation="center">Pets Health Report</Divider>
      <Table
        loading={isLoading}
        dataSource={data ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default PetsHealth;
