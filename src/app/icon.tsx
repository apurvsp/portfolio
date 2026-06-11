import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f2eee2",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          border: "2px solid #161410",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#ff3e00",
          }}
        />
        <span
          style={{
            color: "#161410",
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontFamily: "sans-serif",
          }}
        >
          AP
        </span>
      </div>
    ),
    { ...size }
  );
}
