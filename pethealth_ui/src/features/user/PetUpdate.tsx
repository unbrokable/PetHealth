import { Form, Input, Modal, TimePicker } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectPetUpdate,
  setPetUpdateDate,
  setPetUpdateKind,
  setPetUpdateName,
  setPetUpdateThunk,
  updatePetAsync,
} from "../../app/slice/user/petUpdateSlice";

const PetUpdate = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPetUpdate);
  const history = useHistory();

  useEffect(() => {
    if (state.id === 0 && +state.id !== +id) {
      dispatch(setPetUpdateThunk(id));
    }
  });

  return (
    <Modal
      title=""
      visible={true}
      onOk={() => {
        dispatch(updatePetAsync(state));
        history.goBack();
      }}
      onCancel={() => history.goBack()}
    >
      <Form.Item label="Name" name="name">
        <Input
          value={state.name}
          onChange={(e) => dispatch(setPetUpdateName(e.target.value))}
        />
      </Form.Item>
      <Form.Item label="Kind" name="kind">
        <Input
          value={state.kind}
          onChange={(e) => dispatch(setPetUpdateKind(e.target.value))}
        />
      </Form.Item>
      <Form.Item label="Birthday" name="birthday">
        <TimePicker
          value={moment(state.birthDay)}
          onChange={(value: any) =>
            dispatch(setPetUpdateDate(value?.toDate()!))
          }
        />
      </Form.Item>
    </Modal>
  );
};

export default PetUpdate;
