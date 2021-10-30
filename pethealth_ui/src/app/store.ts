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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware).concat(authorizeMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
