import classnames from "classnames/bind";
import { doc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import BookCardOnAmazon from "components/BookCardOnAmazon";
import SkeletonLoading from "components/SkeletonLoading/SkeletonLoading";
import { db } from "firebaseConfig";
import styles from "./SuggestionBookList.module.scss";

const cx = classnames.bind(styles);

function SuggestionBookList({ searchId }) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [snapshot, loading] = useDocument(doc(db, "searches", searchId));

    return (
        <div className={cx("wrapper")}>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className={cx("title")}>Được đề xuất</h2>
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
                {loading
                    ? Array(4)
                          .fill(0)
                          .map((item, index) => (
                              <SwiperSlide key={index} className="h-auto">
                                  <SkeletonLoading />
                              </SwiperSlide>
                          ))
                    : snapshot?.data()?.results?.map((book, index) => (
                          <SwiperSlide key={index} className="h-auto">
                              <BookCardOnAmazon book={book} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
}

SuggestionBookList.propTypes = {
    searchId: PropTypes.string.isRequired,
};

export default SuggestionBookList;
