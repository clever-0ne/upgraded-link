export default function Layout({ children, title, ogImage }) {
  return (
    <>
      <head>
        <title>{title}</title>
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      </head>
      <body>
        {children}
        <link rel="icon" href="/favicon.ico" />
      </body>
    </>
  );
}