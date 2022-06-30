import {
  Col,
  Divider,
  Row,
  Image,
  Button,
  Form,
  Input,
  Comment,
  List,
  Avatar,
  Spin,
} from "antd";
import { useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetClinicQuery,
} from "../app/api/clinicsApi";
import { connection } from "../app/api/signalRMethods";
import { useAppSelector } from "../app/hooks";
import { RoleType, selectAuthorize } from "../app/slice/AuthorizeSlice";

const { TextArea } = Input;

const PublicClinic = () => {
  const imgUrl =
    "https://cdn.dribbble.com/users/458522/screenshots/16832573/media/f0f67e0dcd6d890d53488784b1dc75dc.png?compress=1&resize=400x300&vertical=top";
  const { id } = useParams() as any;
  const { data: clinic, refetch } = useGetClinicQuery(id);
  const [text, setText] = useState("");
  const [addComment, { isLoading }] = useAddCommentMutation();
  const history = useHistory();
  const auth = useAppSelector(selectAuthorize);

  const { path, url } = useRouteMatch();
  const onSubmit = () => {
    addComment({ text, id }).then(() => {
      refetch();
      setText("");
    });
  };

  const onAddChat = () => {
    connection.invoke("AddChat", { id: +id }).then(() => {
      history.push("/chats/" + id);
    });
  };
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Image width={300} height={300} src={clinic?.imageUrl ?? imgUrl} />
        </Col>
        <Col span={12}>
          <Divider orientation="center">Clinic number</Divider>
          <Row>
            <Col>
              <h3>Clinic №{clinic?.id} </h3>
            </Col>
          </Row>
          <Divider orientation="center">Name</Divider>
          <Row>
            <Col>
              <h3>{clinic?.name} </h3>
            </Col>
          </Row>
          <Divider orientation="center">Pets Now</Divider>
          <Row>
            <Col>
              <h3>Amount Of Animals {clinic?.amountOfPets} </h3>
            </Col>
          </Row>
          <Divider orientation="center">Owner</Divider>
          <Row>
            <Col span={12}>
              <h3>Email {clinic?.user} </h3>
            </Col>
            {auth.role !== "Owner" ? (
              <Col span={12}>
                <Button
                  onClick={() => onAddChat()}
                  danger
                  style={{
                    width: "100%",
                    backgroundColor: "#1c180e",
                    color: "white",
                  }}
                >
                  Chat
                </Button>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      <Divider orientation="left">Comments {clinic?.comments.length}</Divider>

      <List
        dataSource={clinic?.comments}
        itemLayout="horizontal"
        renderItem={(props: any) => (
          <li>
            <Comment
              author={props.userEmail}
              avatar={"https://joeschmoe.io/api/v1/random"}
              content={props.text}
            />
          </li>
        )}
      />
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <>
            {isLoading ? <Spin size="large" /> : null}
            <Form.Item>
              <TextArea
                rows={4}
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </Form.Item>
            {auth.role !== "Owner" ? (
              <Form.Item>
                <Button htmlType="submit" onClick={onSubmit} type="primary">
                  Add Comment
                </Button>
              </Form.Item>
            ) : null}
          </>
        }
      />
    </>
  );
};

export default PublicClinic;
