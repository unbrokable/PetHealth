import { Route, Redirect } from "react-router-dom";
import { jwtService } from "../../app/jwtService";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <>
      {jwtService.get() ? (
        <Route
          {...rest}
          component={(props: any) => <Component {...props} {...rest} />}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
export default PrivateRoute;
