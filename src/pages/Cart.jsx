import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatPrice = (n) => `$${n.toFixed(2)}`;

export default function Cart() {
  const { items, subtotal, setQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Your cart is empty.</p>
        <Link to="/catalog" className="btn btn--primary">
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <table className="cart-table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.sku}>
              <td>
                <Link to={`/catalog/${item.sku}`}>{item.name}</Link>
                <span className="cart-table__sku">{item.sku}</span>
              </td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.qty}
                  aria-label={`Quantity for ${item.name}`}
                  onChange={(e) => setQty(item.sku, Number(e.target.value) || 1)}
                />
              </td>
              <td>{formatPrice(item.price * item.qty)}</td>
              <td>
                <button className="link-btn" onClick={() => removeItem(item.sku)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <aside className="cart-summary">
        <p className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p className="cart-summary__note">Shipping and any applicable tax are calculated at checkout.</p>
        <button className="btn btn--primary" onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </button>
      </aside>
    </div>
  );
}
