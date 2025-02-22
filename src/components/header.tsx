import { JSX } from "react";
import * as HeaderCss from "../css/header.css";


function Header(): JSX.Element {

    const { header, container } = HeaderCss;

    return <div className={container}>
        <h1 className={header}>Kanban Board</h1>
    </div>;
}

export default Header;