import { Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addUserAsync,
  selectUserAdd,
  setUserAddEmail,
  setUserAddName,
  setUserAddPassword,
  setUserAddRole,
} from "../../app/slice/admin/userAddSlice";
import { RoleType } from "../../app/slice/AuthorizeSlice";
const { Option } = Select;
const UserAdd = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectUserAdd);
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      <Modal
        title=""
        visible={true}
        onOk={() => {
          dispatch(addUserAsync(state));
          history.goBack();
        }}
        onCancel={() => history.goBack()}
      >
        <Form.Item label={t("common.n")} name="name">
          <Input
            value={state.name}
            onChange={(e) => dispatch(setUserAddName(e.target.value))}
          />
        </Form.Item>
        <Form.Item label={t("common.e")} name="email">
          <Input
            value={state.email}
            onChange={(e) => dispatch(setUserAddEmail(e.target.value))}
          />
        </Form.Item>
        <Form.Item label={t("common.p")} name="password">
          <Input
            value={state.password}
            onChange={(e) => dispatch(setUserAddPassword(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="role"
          label={t("common.r")}
          rules={[{ required: true }]}
        >
          <Select
            value={state.role}
            placeholder={t("common.s")}
            onChange={(e) => dispatch(setUserAddRole(e))}
          >
            <Option value={RoleType.User}>{RoleType[RoleType.User]}</Option>
            <Option value={RoleType.Owner}>{RoleType[RoleType.Owner]}</Option>
            <Option value={RoleType.Admin}>{RoleType[RoleType.Admin]}</Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default UserAdd;
