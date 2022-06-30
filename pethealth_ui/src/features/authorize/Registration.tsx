import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Form, Input, Button, Select } from "antd";
import {
  registrateThunk,
  selectRegistration,
  setClinicName,
  setRegistrationEmail,
  setRegistrationName,
  setRegistrationPassword,
  setRegistrationRole,
} from "../../app/slice/authorize/registrationSlice";
import Password from "antd/lib/input/Password";
import RedirectToMain from "./../../features/route/RedirectToMain";
import { useTranslation } from "react-i18next";
import { RoleType } from "../../app/slice/AuthorizeSlice";
const { Option } = Select;

const Registration = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectRegistration);
  const { t } = useTranslation();
  return (
    <>
      <RedirectToMain />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={() => dispatch(registrateThunk())}
      >
        <Form.Item
          name="name"
          label={t("common.n")}
          rules={[{ required: true }]}
        >
          <Input
            value={state.name}
            onChange={(e) => dispatch(setRegistrationName(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("common.e")}
          rules={[{ required: true }]}
        >
          <Input
            value={state.email}
            onChange={(e) => dispatch(setRegistrationEmail(e.target.value))}
          />
        </Form.Item>
        <Form.Item label={t("common.p")}>
          <Password
            value={state.password}
            onChange={(e) => dispatch(setRegistrationPassword(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="role"
          label={t("common.r")}
          rules={[{ required: true }]}
        >
          <Select
            value={state.role}
            placeholder="Select"
            onChange={(e) => dispatch(setRegistrationRole(e))}
          >
            <Option value={RoleType.User}>{RoleType[RoleType.User]}</Option>
            <Option value={RoleType.Owner}>{RoleType[RoleType.Owner]}</Option>
          </Select>
        </Form.Item>
        {state.role === RoleType.Owner ? (
          <Form.Item name="clinicName" label={t("common.cn")}>
            <Input
              value={state.clinicName}
              onChange={(e) => dispatch(setClinicName(e.target.value))}
            />
          </Form.Item>
        ) : null}

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {t("menu.r")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Registration;
