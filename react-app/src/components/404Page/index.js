import { Link } from "react-router-dom";
import "./404Page.css";

function PageNotFound() {
    return (
        <div className="page-not-found-wrapper">
            <div className="page-not-found-background">
                <div className="page-not-found-content-div">
                    <h2>404 Page Not Found.</h2>
                    <h4>The page you're looking for <strong>doesn't exist</strong></h4>
                    <h4>Click <Link to="/" >here</Link> to go back, or check out our <a href="https://github.com/Yue-Hao14/DivvyUp-Group-Project" rel="noreferrer" target="_blank">Github repository</a> for help.</h4>
                    <div className="page-not-found-suggestion">
                        <ul>Things you could do:</ul>
                        <li><Link to="/">go back</Link> to the home page</li>
                        <li>Check back our site later</li>
                        <li>panic</li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;
