import { useLanguage } from '../utils/language-context';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-4 py-2 text-sm font-medium transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'BM' : 'EN'}
    </button>
  );
}
