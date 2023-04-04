import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import TippyHeadless from "@tippyjs/react/headless";

import routes from "routes";
import styles from "./Search.module.scss";
import { useAxiosClient, useDebounce } from "hooks";
import bookApiURL from "api/bookApiURL";
import Popper from "components/Popper";
import SearchResult from "../SearchResult";
import Button from "components/Button";

const cx = classNames.bind(styles);

function Search() {
    const axiosClient = useAxiosClient();

    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    const [search, setSearch] = useState(q || "");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(search, 500);
    const inputRef = useRef(null);

    const navigate = useNavigate();

    const handleClearSearch = () => {
        setSearch("");
        setSearchResults([]);
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearch(searchValue);
        }
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        if (search) {
            navigate({
                pathname: routes.search,
                search: `q=${search}`,
            });
            setShowResults(false);
            inputRef.current.blur();
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchSearch = async () => {
            setLoading(true);

            const url = bookApiURL.search({ q: debouncedValue, limit: 5 });
            const res = await axiosClient.get(url);

            setSearchResults(res.data.results);

            setLoading(false);
        };

        fetchSearch();
    }, [debouncedValue, axiosClient]);

    return (
        <div className="h-100">
            <TippyHeadless
                visible={showResults && searchResults?.length > 0}
                interactive
                onClickOutside={() => setShowResults(false)}
                render={(attrs) => (
                    <div className={cx("results")} tabIndex="-1" {...attrs}>
                        <Popper>
                            {searchResults?.map((result) => (
                                <Link
                                    key={result?._id}
                                    to={`${routes.book}/${result?.slug}`}
                                    className="d-block"
                                >
                                    <SearchResult result={result} />
                                </Link>
                            ))}
                        </Popper>
                    </div>
                )}
            >
                <form className={cx("wrapper")} onSubmit={handleSubmitSearch}>
                    <input
                        name="search"
                        ref={inputRef}
                        type="text"
                        className={cx("input")}
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={search}
                        onChange={handleInputChange}
                        onFocus={() => setShowResults(true)}
                        autoComplete="off"
                    />
                    <div className={cx("divider")}></div>
                    {search && !loading && (
                        <TiDelete
                            className={cx("clear")}
                            size={26}
                            onClick={handleClearSearch}
                        />
                    )}

                    {loading && (
                        <div className={cx("dot-spinner")}>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                            <div className={cx("dot-spinner__dot")}></div>
                        </div>
                    )}

                    <Button type="submit" text className={cx("icon")}>
                        <AiOutlineSearch size={22} />
                    </Button>
                </form>
            </TippyHeadless>
        </div>
    );
}

export default Search;
