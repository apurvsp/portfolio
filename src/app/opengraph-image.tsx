import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Apurv Patil — Product · Finance · Manufacturing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0908",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0",
          position: "relative",
          fontFamily: "Georgia, serif",
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
            background: "#c9a96e",
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
              color: "#c9a96e",
              fontSize: "14px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontWeight: 500,
            }}
          >
            Product · Finance · Manufacturing
          </div>

          {/* Name — Satori needs explicit flex on any multi-child div */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                color: "#ece6da",
                fontSize: "112px",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              Apurv
            </div>
            <div
              style={{
                color: "#c9a96e",
                fontSize: "112px",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              Patil
            </div>
          </div>

          {/* Separator + positioning */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "36px",
                height: "1px",
                background: "#c9a96e",
              }}
            />
            <div
              style={{
                color: "#a59c8f",
                fontSize: "22px",
                letterSpacing: "0.05em",
                fontWeight: 400,
                fontStyle: "italic",
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
            borderTop: "1px solid #262220",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "32px",
            }}
          >
            {[
              "Patson Doors",
              "Polychem Group",
              "The Mechanics of Reality",
            ].map((name) => (
              <span
                key={name}
                style={{
                  color: "#635d52",
                  fontSize: "12px",
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
              color: "#635d52",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            www.apurvpatil.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
