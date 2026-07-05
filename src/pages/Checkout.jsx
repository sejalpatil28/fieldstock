import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const formatPrice = (n) => `$${n.toFixed(2)}`;

const EMPTY_FORM = { name: "", email: "", address: "", city: "", postcode: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter a name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!form.address.trim()) errors.address = "Enter a delivery address.";
  if (!form.city.trim()) errors.city = "Enter a city.";
  if (!/^[A-Za-z0-9\- ]{3,10}$/.test(form.postcode)) errors.postcode = "Enter a valid postcode.";
  return errors;
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);

  if (items.length === 0 && !orderNumber) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Demo order — no payment processor or backend is wired up.
    const generated = `FS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generated);
    clear();
  };

  if (orderNumber) {
    return (
      <div className="order-confirm">
        <p className="eyebrow">Order confirmed</p>
        <h1>Thanks, {form.name.split(" ")[0]}.</h1>
        <p>
          Order <strong>{orderNumber}</strong> is logged for demo purposes only — this project doesn't
          process real payments or shipments.
        </p>
        <Link to="/catalog" className="btn btn--primary">
          Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h1>Checkout</h1>

        <label>
          <span>Full name</span>
          <input value={form.name} onChange={handleChange("name")} aria-invalid={!!errors.name} />
          {errors.name && <em className="field-error">{errors.name}</em>}
        </label>

        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={handleChange("email")} aria-invalid={!!errors.email} />
          {errors.email && <em className="field-error">{errors.email}</em>}
        </label>

        <label>
          <span>Delivery address</span>
          <input value={form.address} onChange={handleChange("address")} aria-invalid={!!errors.address} />
          {errors.address && <em className="field-error">{errors.address}</em>}
        </label>

        <div className="checkout-form__row">
          <label>
            <span>City</span>
            <input value={form.city} onChange={handleChange("city")} aria-invalid={!!errors.city} />
            {errors.city && <em className="field-error">{errors.city}</em>}
          </label>
          <label>
            <span>Postcode</span>
            <input value={form.postcode} onChange={handleChange("postcode")} aria-invalid={!!errors.postcode} />
            {errors.postcode && <em className="field-error">{errors.postcode}</em>}
          </label>
        </div>

        <button type="submit" className="btn btn--primary">
          Place order — {formatPrice(subtotal)}
        </button>
      </form>

      <aside className="cart-summary">
        <p className="cart-summary__title">Order summary</p>
        {items.map((item) => (
          <p className="cart-summary__row" key={item.sku}>
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{formatPrice(item.price * item.qty)}</span>
          </p>
        ))}
        <hr />
        <p className="cart-summary__row">
          <strong>Subtotal</strong>
          <strong>{formatPrice(subtotal)}</strong>
        </p>
      </aside>
    </div>
  );
}