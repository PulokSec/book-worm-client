import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";


const PrivateRoute = ({children, ...rest}) => {
  const {loggedInUser} = useContext(UserContext);
  return (
      <Route
    {...rest}
    render={({ location }) =>
      loggedInUser.email ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/signUp",
            state: { from: location }
          }}
        />
      )
    }
  />
  );
};

export default PrivateRoute;