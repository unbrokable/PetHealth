import { Route, useHistory } from "react-router-dom";
import { jwtService } from "../../app/jwtService";

const PublicRoute = ({ component: Component, ...rest }: any) => {
  const token = jwtService?.get();
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => (!token ? <Component {...props} /> : history.goBack())}
    />
  );
};
export default PublicRoute;
