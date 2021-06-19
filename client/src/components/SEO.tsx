import Head from 'next/head';

const SEO: React.FC<{
  title: string;
  description: string;
  url: string;
}> = ({ title, description, url }) => {
  return (
    <Head>
      {/* Meta tags */}
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content="blog,bullying,friendship,friend,erasmus,social project" />
      <meta name="theme-color" content="#00aba9" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      {/* Open Graph data */}
      <meta property="og:title" content={`${title} | Anti Bullying Blog - Erasmus Project`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://anti-bullying-blog.vercel.app${url}`} />
      <meta property="og:image" content="https://anti-bullying-blog.vercel.app/images/logo320.jpeg" />
      <meta property="og:description" content={description} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://anti-bullying-blog.vercel.app${url}`} />
      <meta property="twitter:title" content={`${title} | Anti Bullying Blog - Erasmus Project`} />
      <meta property="twitter:description" content="Not a bully, but a friend" />
      <meta property="twitter:image" content="https://anti-bullying-blog.vercel.app/images/logo320.jpeg"></meta>
      {/* Icons */}
      <link rel="icon" type="image/png" href="/images/favicon.png" />
      <link rel="apple-touch-icon" type="image/png" href="/images/logo320.png" />
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      {/* Title */}
      <meta name="apple-mobile-web-app-title" content="Anti-Bullying Project" />
      <title>{title} | Anti Bullying Blog - Erasmus Project</title>
    </Head>
  )
}

export default SEO;
