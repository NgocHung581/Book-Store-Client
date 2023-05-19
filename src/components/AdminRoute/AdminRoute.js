import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import routes from "routes";

function AdminRoute({ children }) {
    const { user } = useSelector((state) => state.user);

    if (user?.role !== "admin") {
        toast.error("Bạn không có quyền để thực hiện tác vụ này");
        return <Navigate to={routes.home} />;
    }

    return children;
}

export default AdminRoute;
