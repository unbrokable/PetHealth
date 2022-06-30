import { Button, Col, Form, List, Row, Comment } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetChatsQuery } from "../app/api/chatApi";
import { connection } from "../app/api/signalRMethods";
import { Message } from "../app/types/Message";

const Chats = () => {
  const { id } = useParams() as any;
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState(-1);
  const [messages, setMessages] = useState(Array<Message>);
  const { data: chats } = useGetChatsQuery("");

  const handleChatChanging = (chatIdParam: number) => {
    if(chatId === chatIdParam){
      return
    }

    setMessages([])
    connection.off("ReceiveMessage")
    connection.off("ReceiveMessages")


    connection.on("ReceiveMessage", (message: Message) => {
      if(message.chatId === chatIdParam)
        setMessages(messages => [...messages, message]);
    });

    connection.on("ReceiveMessages", (messagesBackend: Array<Message>) =>{
        setMessages(messages => [...messages, ...messagesBackend
          .filter(c => c.chatId === chatIdParam)]);
    })
    
    connection.send("ConnectToChat", { id: chatIdParam });
    setChatId(chatIdParam);
  };

  const sendMessage = () => {
    connection.send("SendMessage", text, chatId);
  };

  if (id) {
    handleChatChanging(id);
  }

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          {chats?.map((chat) => (
            <Button
              onClick={() => handleChatChanging(chat.id)}
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "black",
                margin: "10px",
              }}
            >
              {chat.name}
            </Button>
          ))}
        </Col>
        <Col span={16}>
          <List
            dataSource={messages}
            itemLayout="horizontal"
            renderItem={(props: Message) => (
              <li>
                <Comment
                  author={props.sender}
                  avatar={"https://joeschmoe.io/api/v1/random"}
                  content={props.text}
                />
              </li>
            )}
          />
          <Form.Item>
            <TextArea
              rows={4}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={sendMessage} type="primary">
              Add Message
            </Button>
          </Form.Item>
        </Col>
      </Row>
      ;
    </>
  );
};

export default Chats;
