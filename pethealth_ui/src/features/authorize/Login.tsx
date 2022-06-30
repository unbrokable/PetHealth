import { Button, Checkbox, Form, Input } from "antd";

import { useActions, useAppDispatch, useAppSelector } from "../../app/hooks";
import RedirectToMain from "./../../features/route/RedirectToMain";
import { selectLogin } from "../../app/slice/authorize/loginSlice";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

const Login = () => {
  const { setEmail, loginThunk, setPassword, loginWithGoogle } = useActions();
  const { t } = useTranslation();
  const state = useAppSelector(selectLogin);
  return (
    <>
      <RedirectToMain />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={() => loginThunk()}
      >
        <Form.Item
          label={t("login.e")}
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={state.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={t("login.p")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={state.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 8 }}
        >
          <Checkbox>{t("login.r")}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {t("menu.s")}
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <GoogleLogin
            clientId={
              "983461715427-3abbrtg8qosm6fh2475ualhnuptoo84u.apps.googleusercontent.com"
            }
            buttonText="Google"
            onSuccess={(res) =>
              loginWithGoogle(
                (res as GoogleLoginResponse).getAuthResponse().id_token
              )
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
