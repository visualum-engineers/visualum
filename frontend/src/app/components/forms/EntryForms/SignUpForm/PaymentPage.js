import React from 'react';
export default function PaymentPage(props) {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="payment" className="entry-forms-floating form-label">Payment</label>
                <input
                    data-state="payment"
                    value={props.payment}
                    onChange={props.handleChange}
                    type="number"
                    id="payment"
                    aria-describedby="payment" />
            </div>
        </div>
    )
}