export const html = ({ body, styles }: { body: string, styles: string }) => `
<!DOCTYPE html>
<html>
  <head>
	${styles}
  </head>
  <body style="margin:0">
	<div id="app">${body}</div>
  </body>
  <script src="/bundle.js" defer></script>
</html>
`;
