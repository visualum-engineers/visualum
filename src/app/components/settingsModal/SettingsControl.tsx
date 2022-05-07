import React from "react";

export default function SettingsControl({
  title,
  value,
  subtitle,
  linkText,
  link = null,
  action = null,
}: any) {
  return (
    <div className="settings-control">
      <h3 className="title">
        {title}: <span className="value">{value}</span>
      </h3>
      <span className="link" onClick={action}>
        {linkText}
      </span>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </div>
  );
}
