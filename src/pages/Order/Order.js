import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";

import orderApiURL from "api/orderApiURL";
import Pagination from "components/Pagination/Pagination";
import Separator from "components/Separator/Separator";
import { NUMBER_PER_PAGE, STATUS_ORDER, TIME_OPTIONS } from "constants";
import { useAxiosAuth } from "hooks";
import styles from "./Order.module.scss";
import OrderItem from "./OrderItem/OrderItem";

const cx = classNames.bind(styles);

function Order() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const url = orderApiURL.getAll();
                const res = await axiosAuth.get(url, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`,
                    },
                });
                setOrders(res.data);
            } catch (error) {
                toast.error(error);
            }
        };

        fetchOrders();
    }, [user?.accessToken, axiosAuth]);

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Đơn hàng của bạn</h2>
            <Separator />
            <div className={cx("filter")}>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>Trạng thái</span>
                    <Select
                        className={cx("filter-group-select")}
                        options={STATUS_ORDER}
                        defaultValue={STATUS_ORDER[0]}
                        isSearchable={false}
                    />
                </div>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>Thời gian</span>
                    <Select
                        className={cx("filter-group-select")}
                        options={TIME_OPTIONS}
                        defaultValue={TIME_OPTIONS[0]}
                        isSearchable={false}
                    />
                </div>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>
                        Hiển thị mỗi trang
                    </span>
                    <Select
                        className={cx("filter-group-select")}
                        options={NUMBER_PER_PAGE}
                        defaultValue={NUMBER_PER_PAGE[0]}
                        isSearchable={false}
                    />
                </div>
            </div>
            <Separator />
            <div className={cx("list")}>
                {orders?.length > 0
                    ? orders?.map((order) => (
                          <OrderItem key={order._id} order={order} />
                      ))
                    : "Bạn chưa có đơn hàng nào"}
            </div>
            <div className="text-center mt-4">
                <Pagination
                    forcePage={0}
                    pageCount={10}
                    onPageChange={() => {}}
                />
            </div>
        </div>
    );
}

export default Order;
