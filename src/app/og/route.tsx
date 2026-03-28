import { ImageResponse } from "next/og";

export const runtime = "edge";

async function loadDMSans() {
  const res = await fetch(
    "https://fonts.gstatic.com/s/dmsans/v17/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2"
  );
  return res.arrayBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Luke Taylor - Unity Developer";
  const fontData = await loadDMSans();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f0f",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "80px",
            color: "#f5f5f5",
            fontFamily: "DM Sans, ui-sans-serif, system-ui",
          }}
        >
          {/* Orange accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: "#f97316",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 96,
                height: 96,
                borderRadius: 16,
                background: "#f97316",
                fontWeight: 800,
                fontSize: 36,
                color: "#fff",
              }}
            >
              LT
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 56, fontWeight: 800, color: "#f5f5f5" }}>
                {title}
              </div>
              <div style={{ fontSize: 26, color: "#a3a3a3" }}>
                Unity · EEG · VR — Manchester, UK
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DM Sans",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
