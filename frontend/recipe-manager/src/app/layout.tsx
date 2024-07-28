import "../app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Recipe Management System</title>
      </head>
      <body className="container mx-auto">{children}</body>
    </html>
  );
}
