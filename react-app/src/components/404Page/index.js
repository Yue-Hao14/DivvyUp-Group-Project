import { Link } from "react-router-dom";
import "./404Page.css";

function PageNotFound() {
    return (
        <div className="page-not-found-wrapper">
            <h2>Looks Like The Page You're Looking For Doesn't Exist.</h2>
            <Link to="/">Return Home!</Link>
            <div className="page-not-found-background">
            </div>
        </div>
    )
}

export default PageNotFound;
