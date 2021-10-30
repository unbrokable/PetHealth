import { setError } from "../slice/notificationSlice";
export const errorMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: any) => {
    try {
      // if ((action.type as string).includes("rejected")) {
      //  dispatch(setError(action?.error?.message));
      // }
    } catch {
    } finally {
      next(action);
    }
  };
