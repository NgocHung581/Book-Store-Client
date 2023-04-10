import classNames from "classnames/bind";
import { useState } from "react";
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

function ReviewGroup() {
    const [tabActive, setTabActive] = useState(0);

    return (
        <div>
            <Nav tabs>
                {NAV_ITEM_LIST.map((nav) => (
                    <NavItem key={nav.id} className={cx("tab-item")}>
                        <NavLink
                            className={cx("tab-link", {
                                active: tabActive === nav.id,
                            })}
                            onClick={() => setTabActive(nav.id)}
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
                <TabPane tabId={0} className={cx("tab-content")}>
                    <ReviewList />
                </TabPane>
                <TabPane tabId={5} className={cx("tab-content")}>
                    5 sao
                </TabPane>
                <TabPane tabId={4} className={cx("tab-content")}>
                    4 sao
                </TabPane>
                <TabPane tabId={3} className={cx("tab-content")}>
                    3 sao
                </TabPane>
                <TabPane tabId={2} className={cx("tab-content")}>
                    2 sao
                </TabPane>
                <TabPane tabId={1} className={cx("tab-content")}>
                    1 sao
                </TabPane>
            </TabContent>
        </div>
    );
}

export default ReviewGroup;
