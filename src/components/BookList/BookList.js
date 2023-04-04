import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import bookApiURL from "api/bookApiURL";
import BookCard from "components/BookCard";
import { useAxiosClient } from "hooks";
import styles from "./BookList.module.scss";

const cx = classNames.bind(styles);

function BookList({ title, type, limit, slug = "" }) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [books, setBooks] = useState([]);
    const axiosClient = useAxiosClient();

    useEffect(() => {
        const fetchBooks = async () => {
            const url = bookApiURL.getFeature({ type, limit });
            const res = await axiosClient.get(url);

            if (slug) {
                const newBooks = res.data.filter((book) => book.slug !== slug);
                setBooks(newBooks);
                return;
            }
            setBooks(res.data);
        };

        fetchBooks();
    }, [type, limit, slug, axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className={cx("title")}>{title}</h2>
                <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ marginBottom: "20px" }}
                >
                    <div ref={navigationPrevRef} className={cx("prev-btn")}>
                        <MdOutlineKeyboardArrowLeft size={24} />
                    </div>
                    <div ref={navigationNextRef} className={cx("next-btn")}>
                        <MdOutlineKeyboardArrowRight size={24} />
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                    disabledClass: cx("disabled"),
                }}
                modules={[Navigation]}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {books.map((book) => (
                    <SwiperSlide key={book._id}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

BookList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    limit: PropTypes.number,
    slug: PropTypes.string,
};

export default BookList;
