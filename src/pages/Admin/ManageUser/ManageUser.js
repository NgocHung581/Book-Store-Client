import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useAxiosAuth } from "hooks";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Table } from "reactstrap";
import "tippy.js/dist/tippy.css";

import userApiURL from "api/userApiURL";
import { NUMBER_PER_PAGE, ROLE_OPTIONS } from "constants";
import routes from "routes";
import styles from "./ManageUser.module.scss";
import UserItem from "./UserItem";
import { deleteUserReset } from "redux/slices/userSlice";
import Pagination from "components/Pagination/Pagination";

const cx = classNames.bind(styles);

function ManageUser() {
    const axiosAuth = useAxiosAuth();

    const { user, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 12,
        role: "",
    });
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const role = searchParams.get("role") || "";

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;

        setSearchParams({
            page,
            limit: selectedLimit,
            role,
        });
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.value;

        setSearchParams({
            page,
            limit,
            role: selectedRole,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;

        setSearchParams({
            page: selectedPage,
            limit,
            role,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const params = { page, limit, role };
            const url = userApiURL.getAll(params);
            const res = await axiosAuth.get(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            setUsers(res.data);
        };

        if (success) {
            dispatch(deleteUserReset());
        }

        fetchUsers();
    }, [page, limit, role, success, user?.accessToken, dispatch, axiosAuth]);

    return (
        <div>
            <div className="d-flex align-items-center mb-3">
                <h1 className={cx("title")}>Tất cả người dùng</h1>
                <Tippy content="Thêm mới">
                    <Link to={routes.createUser} className={cx("add-btn")}>
                        <AiOutlinePlus size={20} />
                    </Link>
                </Tippy>
            </div>
            <div className={cx("filter")}>
                <div className={cx("filter-group")}>
                    <span>Hiển thị mỗi trang: </span>
                    <Select
                        options={NUMBER_PER_PAGE}
                        isSearchable={false}
                        onChange={handleLimitChange}
                        value={
                            limit
                                ? NUMBER_PER_PAGE.find((x) => x.value === limit)
                                : NUMBER_PER_PAGE[0]
                        }
                    />
                </div>
                <div className={cx("filter-group")}>
                    <span>Role: </span>
                    <Select
                        options={ROLE_OPTIONS}
                        isSearchable={false}
                        onChange={handleRoleChange}
                        value={
                            role
                                ? ROLE_OPTIONS.find((x) => x.value === role)
                                : ROLE_OPTIONS[0]
                        }
                    />
                </div>
                <span className={cx("total-products")}>
                    {users?.total_results} người dùng
                </span>
            </div>
            <div className={cx("list")}>
                <Table
                    responsive
                    striped
                    hover
                    bordered
                    className="align-middle text-center"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Role</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.results?.map((user, index) => (
                            <UserItem key={index} user={user} index={index} />
                        ))}
                    </tbody>
                </Table>
                <div className="text-center">
                    {users?.total_pages > 1 && (
                        <Pagination
                            pageCount={users?.total_pages}
                            forcePage={page ? page - 1 : 0}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
