export const getTcloHtml = (students: any[], base64: string, qrs: string[]) =>
  students
    .map(
      (s, index) => `
    <div class="page">
      <img src="data:image/png;base64,${base64}" class="bg-img" />
      <div class="content">
        <div class="nombre">${s.nombre.toUpperCase()}</div>
        <img src="${qrs[index]}" class="qr-code" style="position:absolute; bottom:50px; right:50px;" />
      </div>
    </div>
  `,
    )
    .join('');
