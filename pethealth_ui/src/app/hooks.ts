import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { bindActionCreators } from "redux";
import {
  loginActions,
  loginThunk,
  loginWithGoogle,
} from "./slice/authorize/loginSlice";

export const allActionCreators = {
  ...loginActions,
  loginThunk,
  loginWithGoogle,
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
