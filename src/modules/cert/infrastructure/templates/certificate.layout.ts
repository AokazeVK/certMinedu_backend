export const getCertificateLayout = (content: string) => `
  <html>
    <head>
      <style>
        @page { size: LETTER landscape; margin: 0; }
        body { margin: 0; padding: 0; font-family: sans-serif; }
        .page { width: 100vw; height: 100vh; position: relative; page-break-after: always; }
        .bg-img { width: 100%; height: 100%; position: absolute; z-index: -1; }
        .content { position: relative; padding: 100px; color: #333; }
      </style>
    </head>
    <body>${content}</body>
  </html>
`;
