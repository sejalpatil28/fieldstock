import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="wordmark">
          <span className="wordmark__mark">FS</span>
          <span className="wordmark__text">
            Fieldstock
            <em>Catalog No. 04</em>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/catalog" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Catalog
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "is-active" : "")}>
            About
          </NavLink>
        </nav>

        <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
          <span className="cart-link__count">{count}</span>
        </NavLink>
      </div>
    </header>
  );
}
