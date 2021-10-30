import { Button, Checkbox, Form, Input } from "antd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RedirectToMain from "./../../features/route/RedirectToMain";
import {
  loginThunk,
  selectLogin,
  setEmail,
  setPassword,
} from "../../app/slice/authorize/loginSlice";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectLogin);
  return (
    <>
      <RedirectToMain />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={() => dispatch(loginThunk())}
      >
        <Form.Item
          label={t("login.e")}
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={state.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </Form.Item>

        <Form.Item
          label={t("login.p")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={state.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 8 }}
        >
          <Checkbox>{t("login.r")}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t("menu.s")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
