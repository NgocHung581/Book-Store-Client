import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Col, Row } from "reactstrap";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import bookApiURL from "api/bookApiURL";
import Button from "components/Button";
import { useAxiosClient } from "hooks";
import routes from "routes/routes";
import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

function Banner() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1223px)" });
    const [sliders, setSliders] = useState([]);
    const axiosClient = useAxiosClient();

    useEffect(() => {
        const fetchSlider = async () => {
            const params = { type: "slider", limit: 5 };

            const url = bookApiURL.getFeature(params);
            const res = await axiosClient.get(url);

            setSliders(res.data);
        };

        fetchSlider();
    }, [axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                    bulletActiveClass: cx("bullet-active"),
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className={cx("content")}
            >
                {sliders?.map((slider) => (
                    <SwiperSlide key={slider?._id} className={cx("item")}>
                        <Row className="h-100 align-items-center">
                            <Col lg={8} md={8} xs={6}>
                                <div
                                    className={
                                        isTabletOrMobile ? "ps-3" : "px-5"
                                    }
                                >
                                    <h1 className={cx("item-name")}>
                                        {slider?.name}
                                    </h1>
                                    <p className={cx("item-description")}>
                                        {slider?.description}
                                    </p>
                                    <Button
                                        outline
                                        className={cx("detail-btn")}
                                        to={`${routes.book}/${slider?.slug}`}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </Col>
                            <Col
                                lg={4}
                                md={4}
                                xs={6}
                                className="text-center h-100"
                            >
                                <div className="h-100">
                                    <img
                                        src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${slider?.image}`}
                                        alt={slider?.name}
                                        className="rounded"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;
