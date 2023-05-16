import classNames from "classnames/bind";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import Select from "react-select";
import { MdKeyboardArrowLeft } from "react-icons/md";

import styles from "./UpdateStatusOrder.module.scss";
import routes from "routes";
import { useAxiosAuth } from "hooks";
import orderApiURL from "api/orderApiURL";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const STATUS = [
    { value: 2, label: "Chờ xác nhận" },
    { value: 3, label: "Chờ lấy hàng" },
    { value: 4, label: "Đang giao hàng" },
    { value: 5, label: "Đã hoàn thành" },
    { value: 6, label: "Đã hủy" },
];

function UpdateStatusOrder() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleStatusChange = async (e) => {
        const selectedStatus = e.value;
        try {
            const url = orderApiURL.updateStatus(id);
            const res = await axiosAuth.put(
                url,
                { status: selectedStatus },
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );

            toast.success(res.message);
            navigate(routes.manageOrder);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    if (!state) return <Navigate to={routes.manageOrder} />;

    return (
        <div>
            <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                <MdKeyboardArrowLeft size={24} /> Trở lại
            </div>

            <h1 className={cx("title")}>Cập nhật trạng thái đơn hàng</h1>
            <div className="w-25">
                <Select
                    options={STATUS}
                    isSearchable={false}
                    onChange={handleStatusChange}
                    value={STATUS.find((x) => x.value === state?.status)}
                />
            </div>
        </div>
    );
}

export default UpdateStatusOrder;
