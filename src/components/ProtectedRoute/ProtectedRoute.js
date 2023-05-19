import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import routes from "routes";

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to={routes.login} />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
