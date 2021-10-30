import { Redirect } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { jwtService } from "./../../app/jwtService";
import { RoleType, selectAuthorize } from "./../../app/slice/AuthorizeSlice";
const RedirectToMain = () => {
  const state = useAppSelector(selectAuthorize);
  const redirectTo = () => {
    const role = jwtService.getRole();
    if (role === RoleType[RoleType.Admin]) {
      return "/users";
    } else if (role === RoleType[RoleType.Owner]) {
      return "/clinic";
    } else {
      return "/as";
    }
  };
  let token = jwtService.get();
  return (
    <>{token || state.isAuthorize ? <Redirect to={redirectTo()} /> : null}</>
  );
};

export default RedirectToMain;
