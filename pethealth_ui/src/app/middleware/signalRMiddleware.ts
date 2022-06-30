import { jwtService } from "./../jwtService";
import { setRole } from "../slice/AuthorizeSlice";
import { setupConnection } from "../api/signalRMethods";

const signalRMiddleware =
  ({ getState }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type === setRole.type && jwtService.get()) {
      setupConnection("https://localhost:5001/hubs/message");
    }

    return next(action);
  };

export default signalRMiddleware;
