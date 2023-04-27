import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { Col, Row } from "reactstrap";
import { MdKeyboardArrowLeft } from "react-icons/md";

import styles from "./SearchOnAmazon.module.scss";
import { db } from "firebaseConfig";
import Loader from "components/Loader";
import BookCardOnAmazon from "components/BookCardOnAmazon";

const cx = classNames.bind(styles);

function SearchOnAmazon() {
    const { id } = useParams();

    const [snapshot, loading] = useDocument(doc(db, "searches", id));

    const navigate = useNavigate();

    if (loading) return <div>Loading Results...</div>;

    if (!snapshot?.exists()) return;

    if (snapshot?.data()?.status === "pending") return <Loader />;

    return (
        <div>
            <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                <MdKeyboardArrowLeft size={24} /> Trở lại
            </div>
            <div className={cx("title")}>
                <span>
                    Kết quả tìm kiếm của "{snapshot?.data()?.search}" trên
                    Amazon
                </span>
                <span className={cx("results-length")}>
                    ({snapshot?.data()?.results?.length} kết quả)
                </span>
            </div>
            <Row className="gy-4">
                {snapshot?.data()?.results?.map((book, index) => (
                    <Col key={index} lg={3}>
                        <BookCardOnAmazon book={book} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default SearchOnAmazon;
