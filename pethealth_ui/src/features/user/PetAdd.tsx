import { ConfigProvider, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addPetAsync,
  selectPetAdd,
  setPetAddDate,
  setPetAddKind,
  setPetAddName,
} from "../../app/slice/user/petAddSlice";
import ukUA from "antd/lib/locale/uk_UA";
import enUS from "antd/lib/locale/en_US";

const PetAdd = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPetAdd);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  return (
    <Modal
      title=""
      visible={true}
      onOk={() => {
        dispatch(addPetAsync(state));
        history.goBack();
      }}
      onCancel={() => history.goBack()}
    >
      <Form.Item label="Name" name="name">
        <Input
          value={state.name}
          onChange={(e) => dispatch(setPetAddName(e.target.value))}
        />
      </Form.Item>
      <Form.Item label="Kind" name="kind">
        <Input
          value={state.kind}
          onChange={(e) => dispatch(setPetAddKind(e.target.value))}
        />
      </Form.Item>
      <Form.Item label="Birthday" name="birthday">
        <DatePicker
          value={moment(state.birthDay)}
          onChange={(value) => dispatch(setPetAddDate(value?.toDate()!))}
        />
      </Form.Item>
    </Modal>
  );
};

export default PetAdd;
