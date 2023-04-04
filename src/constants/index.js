import { BiLogOut, BiUser } from "react-icons/bi";
import { BsBook, BsHeart, BsMoonStars } from "react-icons/bs";

import routes from "routes/routes";

export const NUMBER_PER_PAGE = [
    { value: "2", label: "2 sản phẩm" },
    { value: "4", label: "4 sản phầm" },
    { value: "6", label: "6 sản phẩm" },
    { value: "8", label: "8 sản phẩm" },
];

export const NAV_LIST = [
    { label: "Trang chủ", path: routes.home },
    { label: "Tất cả sách", path: routes.book },
    { label: "Liên hệ", path: routes.contact },
];

export const MENU_ACCOUNT = [
    { title: "Trang cá nhân", icon: BiUser, path: routes.profile },
    { title: "Đơn hàng", icon: BsBook, path: routes.order },
    { title: "Giao diện tối", icon: BsMoonStars, darkMode: true },
];

export const MENU_ACCOUNT_MOBILE = [
    { title: "Trang cá nhân", icon: BiUser, path: routes.profile },
    { title: "Đơn hàng", icon: BsBook, path: routes.order },
    { title: "Yêu thích", icon: BsHeart, path: routes.wishlist },
    { title: "Giao diện tối", icon: BsMoonStars, darkMode: true },
    { title: "Đăng xuất", icon: BiLogOut, path: routes.home, separate: true },
];

export const STATUS_ORDER = [
    { value: 1, label: "Tất cả" },
    { value: 2, label: "Chờ xác nhận" },
    { value: 3, label: "Chờ lấy hàng" },
    { value: 4, label: "Đang giao hàng" },
    { value: 5, label: "Đánh giá" },
    { value: 6, label: "Đã hủy" },
];

export const TIME_OPTIONS = [
    { value: "new", label: "Mới nhất" },
    { value: "old", label: "Cũ nhất" },
];
