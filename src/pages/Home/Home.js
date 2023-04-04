import { Helmet } from "react-helmet-async";

import BookList from "components/BookList";
import Banner from "./Banner";

function Home() {
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="pt-3">
                <Banner />
                <div className="mt-5">
                    <BookList
                        title="Sách bán chạy nhất"
                        type="rating"
                        limit={10}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
