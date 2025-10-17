import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { LanguageProvider } from '../utils/language-context';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
