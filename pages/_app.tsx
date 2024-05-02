import type { AppProps } from 'next/app';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import React from 'react';
import 'tailwindcss/tailwind.css';
import localFont from "@next/font/local";
import SiteFooter from '../components/common/SiteFooter';
import SiteHeader from '../components/common/SiteHeader';

const placard = localFont({
  src: [
    {
      path: "../public/fonts/PlacardNext/PlacardNextRegular.ttf"
    }
  ]
});

const placardBold = localFont({
  src: [
    {
      path: "../public/fonts/PlacardNext/PlacardNextBold.ttf"
    }
  ]
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Regular.ttf"
    }
  ]
});

const robotoBold = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Bold.ttf"
    }
  ]
});

const lucidity = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/Lucidity-Condensed.ttf",
    }
  ]
});

const cooper = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/CooperHewitt-Semibold.otf",
    }
  ]
});

const campground = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/Campground.otf",
    }
  ]
});

const fredoka = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/fredoka-one/FredokaOne-Regular.otf",
    }
  ]
});

const primer = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/primer/primer print bold.otf",
    }
  ]
});

const rust = localFont({
  src: [
    {
      path: "../public/tech-tank/fonts/intro-rust/IntroRust-Base.otf",
    }
  ]
});

/**
 * A wrapper for the root website component.
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  const path = usePathname()

  return (
    <>
      <Head>
        <title>Home &ndash; AIS</title>
        {path == "/tech-tank" || path == "/tech-tank/profile" ? 
          <link rel="icon" href="/tech-tank/tech-tank-logo.png" type="image/png" sizes="any"/>
        :
          <link rel="icon" href="/images/Logos/square-logo-dark.jpg" type="image/jpg" sizes="any"/>
        }
      </Head>
      <style>{`
        :root {
          /* ... */
          --placard: ${placard.style.fontFamily};
          --placard-bold: ${placardBold.style.fontFamily};
          --roboto: ${roboto.style.fontFamily};
          --roboto-bold: ${robotoBold.style.fontFamily};

          --lucidity: ${lucidity.style.fontFamily};
          --cooper: ${cooper.style.fontFamily};
          --campground: ${campground.style.fontFamily};
          --fredoka: ${fredoka.style.fontFamily};
          --primer: ${primer.style.fontFamily};
          --rust: ${rust.style.fontFamily};
        }
      `}</style>

      {path == "/tech-tank" || path == "/tech-tank/profile" ? 
        <Component {...pageProps}/>
      :
        <>
          
          <SiteHeader/>
          <Component {...pageProps} />
          <SiteFooter/>
        </>
      }
    </>
  );
}