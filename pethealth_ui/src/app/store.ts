import { petsApi } from "./api/petsApi";
import { chatApi } from "./api/chatApi";
import { clinicsApi } from "./api/clinicsApi";
import { authApi } from "./api/authApi";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authorizeMiddleware } from "./middleware/authorizeMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import registrationReducer from "./slice/authorize/registrationSlice";
import loginReducer from "./slice/authorize/loginSlice";
import authorizeReducer from "./slice/AuthorizeSlice";
import notificationReducer from "./slice/notificationSlice";
import usersReducer from "./slice/admin/usersSlice";
import userAddReducer from "./slice/admin/userAddSlice";
import petAddReducer from "./slice/user/petAddSlice";
import petReducer from "./slice/user/petSlice";
import petsReducer from "./slice/user/petsSlice";
import petUpdateReducer from "./slice/user/petUpdateSlice";
import clinicReducer from "./slice/owner/clinicSlice";
import clinicRecordAddReducer from "./slice/owner/clinicRecordAdd";
import clinicPetAddReducer from "./slice/owner/clinicPetAdd";
import signalRMiddleware from "./middleware/signalRMiddleware";

export const store = configureStore({
  reducer: {
    authorize: authorizeReducer,
    login: loginReducer,
    registration: registrationReducer,
    notification: notificationReducer,

    //users
    users: usersReducer,
    userAdd: userAddReducer,

    //pets
    petAdd: petAddReducer,
    pet: petReducer,
    pets: petsReducer,
    petUpdate: petUpdateReducer,

    //clinic
    clinic: clinicReducer,
    clinicRecordAdd: clinicRecordAddReducer,
    clinicPetAdd: clinicPetAddReducer,

    // api
    [clinicsApi.reducerPath]: clinicsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [petsApi.reducerPath]: petsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(errorMiddleware)
      .concat(authorizeMiddleware)
      .concat(signalRMiddleware)
      .concat(authApi.middleware as any)
      .concat(clinicsApi.middleware)
      .concat(chatApi.middleware)
      .concat(petsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
