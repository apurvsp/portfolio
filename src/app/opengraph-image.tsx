import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Apurv Patil — Operator. Builder. Investor.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090909",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "#c8a87a",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flex: 1,
            padding: "72px 88px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              color: "#c8a87a",
              fontSize: "13px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontWeight: 500,
            }}
          >
            Finance × Software
          </div>

          {/* Name */}
          <div
            style={{
              color: "#eeebe4",
              fontSize: "108px",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              marginBottom: "32px",
            }}
          >
            Apurv
            <br />
            Patil
          </div>

          {/* Separator + positioning */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "36px",
                height: "1px",
                background: "#c8a87a",
              }}
            />
            <div
              style={{
                color: "#7a7a7a",
                fontSize: "22px",
                letterSpacing: "0.05em",
                fontWeight: 300,
              }}
            >
              Operator. Builder. Investor.
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 88px",
            borderTop: "1px solid #131313",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "32px",
            }}
          >
            {[
              "Morning Intel Brief",
              "Reverse DCF Tool",
              "Options Greeks Viz",
              "NSE Screener",
            ].map((name) => (
              <span
                key={name}
                style={{
                  color: "#2e2e2e",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <div
            style={{
              color: "#2e2e2e",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            apurvpatil.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
