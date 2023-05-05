import { Helmet } from "react-helmet-async";
import { useRef } from "react";

import BookList from "components/BookList";
import Banner from "./Banner";
import SuggestionBookList from "./SuggestionBookList";

function Home() {
    const searchHistory = useRef(localStorage.getItem("search"));

    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="pt-3">
                <Banner />
                {searchHistory.current && (
                    <div className="mt-5">
                        <SuggestionBookList searchId={searchHistory.current} />
                    </div>
                )}
                <div className="mt-5">
                    <BookList
                        title="Sách nổi bật nhất"
                        type="rating"
                        limit={10}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
