import { Link } from "react-router-dom";
import "./404Page.css";

function PageNotFound() {
    return (
        <div className="page-not-found-wrapper">
            <div className="page-not-found-background">
                <div className="page-not-found-content-div">
                    <h2>404 Page Not Found</h2>
                    <Link to="/">Return Home</Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;
