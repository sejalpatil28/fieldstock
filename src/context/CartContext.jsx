import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "fieldstock.cart.v1";

function readInitialState() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action;
      const existing = state.items.find((i) => i.sku === product.sku);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.sku === product.sku
              ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { sku: product.sku, name: product.name, price: product.price, qty, stock: product.stock },
        ],
      };
    }
    case "SET_QTY": {
      return {
        items: state.items
          .map((i) => (i.sku === action.sku ? { ...i, qty: Math.max(0, Math.min(action.qty, i.stock)) } : i))
          .filter((i) => i.qty > 0),
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.sku !== action.sku) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readInitialState);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — cart just won't persist
    }
  }, [state]);

  const value = useMemo(() => {
    const count = state.items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return {
      items: state.items,
      count,
      subtotal,
      addItem: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
      setQty: (sku, qty) => dispatch({ type: "SET_QTY", sku, qty }),
      removeItem: (sku) => dispatch({ type: "REMOVE", sku }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}