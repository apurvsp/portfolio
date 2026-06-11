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
          background: "#07060b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Aurora glows */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            borderRadius: "9999px",
            left: "-180px",
            top: "-260px",
            background:
              "radial-gradient(circle, rgba(124,93,250,0.4) 0%, rgba(124,93,250,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "9999px",
            right: "-160px",
            bottom: "-240px",
            background:
              "radial-gradient(circle, rgba(111,227,255,0.25) 0%, rgba(111,227,255,0) 65%)",
            display: "flex",
          }}
        />

        {/* Top strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 72px 0 72px",
          }}
        >
          <div
            style={{
              color: "#a39fb2",
              fontSize: "15px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            001 — Signal
          </div>
          <div
            style={{
              color: "#6fe3ff",
              fontSize: "14px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            ● Available
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              color: "#f1eee7",
              fontSize: "150px",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              display: "flex",
            }}
          >
            Apurv
          </div>
          <div
            style={{
              fontSize: "150px",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              backgroundImage:
                "linear-gradient(100deg, #a18bff 0%, #6fe3ff 60%, #a18bff 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Patil
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginTop: "34px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "linear-gradient(90deg, #7c5dfa, #6fe3ff)",
                display: "flex",
              }}
            />
            <div
              style={{
                color: "#a39fb2",
                fontSize: "22px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Operator · Builder · Investor
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 72px 40px 72px",
            borderTop: "1px solid rgba(241,238,231,0.12)",
          }}
        >
          <div style={{ display: "flex", gap: "30px" }}>
            {["Patson Doors", "Polychem Group", "Mechanics of Reality"].map(
              (name) => (
                <span
                  key={name}
                  style={{
                    color: "#5e5a6e",
                    fontSize: "13px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </span>
              )
            )}
          </div>
          <div
            style={{
              color: "#a18bff",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            apurvpatil.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
