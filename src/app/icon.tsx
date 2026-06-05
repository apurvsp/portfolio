import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090909",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "#c8a87a",
          }}
        />
        <span
          style={{
            color: "#eeebe4",
            fontSize: "13px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
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
