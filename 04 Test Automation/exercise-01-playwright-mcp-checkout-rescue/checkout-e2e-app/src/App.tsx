import { useState } from "react";
import {
  authorizePayment,
  quoteTax,
  type TaxQuote,
} from "./services/checkoutApi";
import "./styles.css";

const subtotal = 100;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface Confirmation {
  orderId: string;
  total: number;
}

export default function App() {
  const [customerName, setCustomerName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [quote, setQuote] = useState<TaxQuote | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState("");
  const [quoting, setQuoting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function calculateTax() {
    setError("");
    setQuoting(true);
    try {
      setQuote(await quoteTax(postalCode.trim()));
    } catch {
      setError("Tax quote is unavailable. Please try again.");
    } finally {
      setQuoting(false);
    }
  }

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!quote) {
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const result = await authorizePayment({
        amount: quote.total,
        cardNumber,
        customerName,
      });
      if (result.status === "approved") {
        setConfirmation({
          orderId: result.orderId,
          total: quote.total,
        });
      } else {
        setError(result.reason);
      }
    } catch {
      setError("Payment could not be processed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-shell">
      <header className="checkout-header">
        <p className="eyebrow">Northstar Supply</p>
        <h1>Checkout</h1>
        <p>Secure checkout with deterministic tax and payment boundaries.</p>
      </header>

      {confirmation ? (
        <section className="confirmation-card" aria-label="Order confirmation">
          <span className="confirmation-icon" aria-hidden="true">
            ✓
          </span>
          <p className="eyebrow">Payment approved</p>
          <h2>Thanks for your order</h2>
          <p>
            Confirmation <strong>{confirmation.orderId}</strong>
          </p>
          <p>
            Charged <strong>{currency.format(confirmation.total)}</strong>
          </p>
        </section>
      ) : (
        <div className="checkout-grid">
          <section className="summary-card" aria-labelledby="summary-title">
            <p className="eyebrow">Your cart</p>
            <h2 id="summary-title">Order summary</h2>
            <div className="product-row">
              <div className="product-art" aria-hidden="true">
                CB
              </div>
              <div>
                <h3>Canvas Backpack</h3>
                <p>Natural · One size</p>
              </div>
              <strong>{currency.format(subtotal)}</strong>
            </div>
            <div className="totals">
              <p>
                Subtotal <strong>{currency.format(subtotal)}</strong>
              </p>
              {quote && (
                <>
                  <p>
                    Tax <strong>{currency.format(quote.tax)}</strong>
                  </p>
                  <p className="grand-total">
                    Total <strong>{currency.format(quote.total)}</strong>
                  </p>
                </>
              )}
            </div>
          </section>

          <form className="payment-card" onSubmit={placeOrder}>
            <p className="eyebrow">Payment</p>
            <h2>Contact and card details</h2>

            <label>
              Full name
              <input
                autoComplete="name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                required
              />
            </label>

            <label>
              Postal code
              <span className="inline-control">
                <input
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={(event) => {
                    setPostalCode(event.target.value);
                    setQuote(null);
                  }}
                  required
                />
                <button
                  className="secondary-button"
                  type="button"
                  onClick={calculateTax}
                  disabled={!postalCode.trim() || quoting}
                >
                  {quoting ? "Calculating..." : "Calculate tax"}
                </button>
              </span>
            </label>

            <label>
              Card number
              <input
                autoComplete="cc-number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                required
              />
            </label>

            {error && <p role="alert">{error}</p>}

            <button
              className="primary-button"
              type="submit"
              disabled={
                !quote ||
                !customerName.trim() ||
                !cardNumber.trim() ||
                submitting
              }
            >
              {submitting ? "Authorizing..." : "Place order"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
