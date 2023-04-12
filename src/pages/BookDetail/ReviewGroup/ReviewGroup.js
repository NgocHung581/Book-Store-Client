import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import ReviewList from "../ReviewList";
import styles from "./ReviewGroup.module.scss";

const cx = classNames.bind(styles);

const NAV_ITEM_LIST = [
    { label: "Tất cả", id: 0 },
    { label: "5 sao", id: 5 },
    { label: "4 sao", id: 4 },
    { label: "3 sao", id: 3 },
    { label: "2 sao", id: 2 },
    { label: "1 sao", id: 1 },
];

function ReviewGroup({ reviewRef }) {
    const [tabActive, setTabActive] = useState(0);

    const handleClickNav = (nav) => {
        setTabActive(nav.id);
    };

    return (
        <div>
            <Nav tabs>
                {NAV_ITEM_LIST.map((nav) => (
                    <NavItem key={nav.id} className={cx("tab-item")}>
                        <NavLink
                            className={cx("tab-link", {
                                active: tabActive === nav.id,
                            })}
                            onClick={() => handleClickNav(nav)}
                        >
                            {nav.label}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent
                activeTab={tabActive}
                className="mt-3 position-relative"
            >
                {NAV_ITEM_LIST.map((nav) => (
                    <TabPane
                        key={nav.id}
                        tabId={nav.id}
                        className={cx("tab-content")}
                    >
                        {tabActive === nav.id && (
                            <ReviewList
                                star={tabActive}
                                reviewRef={reviewRef}
                            />
                        )}
                    </TabPane>
                ))}
            </TabContent>
        </div>
    );
}

export default ReviewGroup;
