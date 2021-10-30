import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addHealthRecordAsync,
  selectClinicRecordAdd,
  setDescription,
  setPetId,
  setPulse,
  setTemperature,
  setWeight,
} from "../../app/slice/owner/clinicRecordAdd";

export const ClinicRecordAdd = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectClinicRecordAdd);
  const history = useHistory();

  useEffect(() => {
    if (state.petId !== id || state.petId === 0) {
      dispatch(setPetId(id));
    }
  });
  return (
    <>
      <Modal
        title=""
        visible={true}
        onOk={() => {
          dispatch(addHealthRecordAsync(state));
          history.goBack();
        }}
        onCancel={() => history.goBack()}
      >
        <Form.Item label="Description" name="description">
          <Input
            value={state.description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Pulse" name="pulse">
          <Input
            value={state.pulse}
            onChange={(e) => dispatch(setPulse(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Temperature" name="temperature">
          <Input
            type="number"
            value={state.temperature}
            onChange={(e) => dispatch(setTemperature(+e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Weight" name="weight">
          <Input
            type="number"
            value={state.weight}
            onChange={(e) => dispatch(setWeight(+e.target.value))}
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ClinicRecordAdd;
