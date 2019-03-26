import React from "react";
import OrderForm from "../orders/OrderForm";
import OrderSummary from "../orderforms/OrderSummary";

export default function OrderPage() {
  return (
    <div>
      <OrderForm />
      <OrderSummary />
    </div>
  );
}
