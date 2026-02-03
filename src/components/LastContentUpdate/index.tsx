import React from "react";
import lastUpdate from "../../data/last-update.json";

interface LastUpdateData {
  formatted: string;
  iso: string;
  timestamp: number;
}

export default function LastContentUpdate(): JSX.Element {
  const data = lastUpdate as LastUpdateData;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "var(--ifm-color-emphasis-100)",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
        color: "var(--ifm-color-content-secondary)",
        marginBottom: "1rem",
      }}
    >
      <span style={{fontWeight: 500}}>Last content update:</span>
      <time dateTime={data.iso} style={{color: "var(--ifm-color-primary)"}}>
        {data.formatted}
      </time>
    </div>
  );
}
