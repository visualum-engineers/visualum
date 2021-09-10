import React from "react"
export default function SubscriptionType(props) {
    return (
        <div>
            <div className="mb-3 mt-3 d-flex-column" style={{ textAlign: "center" }}>
                <label htmlFor="subscriptionType" className="logSignForm  form-label">Choose Subscription</label>
                <div>
                    <input
                        checked={props.subscriptionType === "free"}
                        name="subscriptionType"
                        value="free"
                        data-state="subscriptionType"
                        onChange={props.handleChange}
                        type="radio"
                        id="free"
                        aria-describedby="subscriptionType" />
                    <input
                        checked={props.subscriptionType === "mid-tier"}
                        name="subscriptionType"
                        value="mid-tier"
                        data-state="subscriptionType"
                        onChange={props.handleChange}
                        type="radio"
                        id="mid-tier"
                        aria-describedby="subscriptionType" />
                    <input
                        checked={props.subscriptionType === "high-tier"}
                        name="subscriptionType"
                        value="high-tier"
                        data-state="subscriptionType"
                        onChange={props.handleChange}
                        type="radio"
                        id="high-tier"
                        aria-describedby="subscriptionType" />
                    <input
                        checked={props.subscriptionType === "enterprise"}
                        name="subscriptionType"
                        value="enterprise"
                        data-state="subscriptionType"
                        onChange={props.handleChange}
                        type="radio"
                        id="enterprise"
                        aria-describedby="subscriptionType" />
                </div>
            </div>
        </div>
    )
}