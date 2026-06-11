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
          background: "#f2eee2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top red bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "#ff3e00",
          }}
        />

        {/* File tab strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "3px solid #161410",
            margin: "48px 72px 0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#161410",
              color: "#f2eee2",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              padding: "10px 16px",
            }}
          >
            FILE 01 — IDENTITY
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              color: "#8d8675",
              fontSize: "15px",
              letterSpacing: "0.25em",
            }}
          >
            INDEX/2026
          </div>
        </div>

        {/* Name poster */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#161410",
              fontSize: "168px",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            APURV
          </div>
          <div
            style={{
              display: "flex",
              color: "#ff3e00",
              fontSize: "168px",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            PATIL
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginTop: "36px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "5px",
                background: "#ff3e00",
              }}
            />
            <div
              style={{
                display: "flex",
                color: "#514c41",
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "0.18em",
              }}
            >
              OPERATOR · BUILDER · INVESTOR
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 72px",
            borderTop: "3px solid #161410",
            background: "#161410",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            {["PATSON DOORS", "POLYCHEM GROUP", "MECHANICS OF REALITY"].map(
              (name) => (
                <span
                  key={name}
                  style={{
                    color: "#f2eee2",
                    fontSize: "14px",
                    letterSpacing: "0.2em",
                    fontWeight: 500,
                  }}
                >
                  {name}
                </span>
              )
            )}
          </div>
          <div
            style={{
              color: "#ff3e00",
              fontSize: "14px",
              letterSpacing: "0.2em",
              fontWeight: 700,
            }}
          >
            APURVPATIL.COM
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
