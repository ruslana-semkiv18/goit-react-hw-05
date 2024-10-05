import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
    return (
        <div className={css.wrap}>
            <h1 className={css.title}>404 Not Found!</h1>
            <p className={css.text}>Please use this link to go <Link to="/">back home</Link></p>
        </div>
    )
}