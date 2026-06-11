import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07060b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: "7px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #7c5dfa, #6fe3ff)",
          }}
        />
        <span
          style={{
            color: "#f1eee7",
            fontSize: "14px",
            fontWeight: 800,
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
