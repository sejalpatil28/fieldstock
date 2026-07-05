import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty-state">
      <p className="eyebrow">404</p>
      <p>This page isn't in the current printing.</p>
      <Link to="/" className="btn btn--primary">
        Back to the front page
      </Link>
    </div>
  );
}