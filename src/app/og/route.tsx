import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Luke Taylor — Unity Developer";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0b0f 0%, #3b0764 100%)",
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
            color: "#fff",
            fontFamily: "Inter, ui-sans-serif, system-ui",
          }}
        >
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
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(147,51,234,1) 0%, rgba(126,34,206,1) 100%)",
                boxShadow: "0 20px 60px rgba(147,51,234,0.35)",
                fontWeight: 800,
                fontSize: 36,
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
              <div style={{ fontSize: 60, fontWeight: 800 }}>{title}</div>
              <div style={{ fontSize: 28, color: "#c4b5fd" }}>
                Unity • EEG • VR — Manchester, UK
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
