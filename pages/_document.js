import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="OutSystems & Full Stack Developer in Cairo, Egypt. Mohamed Magdy builds fast, reliable web applications with OutSystems, React, Node.js and MongoDB." />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
