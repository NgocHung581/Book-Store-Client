import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import routes from "routes/routes";

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
