import { jwtService } from "../jwtService";
import { setAuthorize } from "./../slice/AuthorizeSlice";
export const authorizeMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: any) => {
    try {
      if (!jwtService.get() && action.type !== setAuthorize.type) {
        dispatch(setAuthorize(false));
      }
    } catch {
    } finally {
      next(action);
    }
  };
