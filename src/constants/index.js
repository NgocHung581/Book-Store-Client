import { BiLogOut, BiUser } from "react-icons/bi";
import { BsBook, BsHeart, BsMoonStars } from "react-icons/bs";

import routes from "routes";

export const NUMBER_PER_PAGE = [
    { value: 12, label: "12 sản phẩm" },
    { value: 24, label: "24 sản phẩm" },
    { value: 36, label: "36 sản phẩm" },
    { value: 48, label: "48 sản phẩm" },
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
    { value: 5, label: "Đã hoàn thành" },
    { value: 6, label: "Đã hủy" },
];

export const TIME_OPTIONS = [
    { value: "desc", label: "Mới nhất" },
    { value: "asc", label: "Cũ nhất" },
];

export const RATING_OPTIONS = [
    { value: 1, label: "1 ⭐ - Rất tệ" },
    { value: 2, label: "2 ⭐ - Bình thường" },
    { value: 3, label: "3 ⭐ - Khá tốt" },
    { value: 4, label: "4 ⭐ - Tốt" },
    { value: 5, label: "5 ⭐ - Tuyệt vời" },
];
