import { jwtService } from "./../jwtService";
import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@aspnet/signalr";

export let connection: HubConnection;

export const setupConnection = (hubUrl: string) => {
  const protocol = new JsonHubProtocol();

  const transport =
    HttpTransportType.WebSockets |
    HttpTransportType.LongPolling |
    HttpTransportType.ServerSentEvents;

  const options = {
    transport,
    logMessageContent: true,
    logger: LogLevel.Trace,
    accessTokenFactory: () => jwtService.get() ?? "",
  };

  connection = new HubConnectionBuilder()
    .withUrl(hubUrl, options)
    .withHubProtocol(protocol)
    .build();

  setupEvents(connection, []);

  connection.onclose(() =>
    setTimeout(() => startSignalRConnection(connection), 5000)
  );

  startSignalRConnection(connection);
};

export const startSignalRConnection = (connection: HubConnection) =>
  connection
    .start()
    .then(() => console.info("SignalR Connected"))
    .catch((err: any) => console.error("SignalR Connection Error: ", err));

export const setupEvents = (
  connection: HubConnection,
  events: { name: string; handler: any }[]
) => {
  for (let e of events) {
    connection.on(e.name, e.handler);
  }
};
