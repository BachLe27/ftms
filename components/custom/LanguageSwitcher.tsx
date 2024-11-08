import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [onOpen, setOnOpen] = useState<boolean>(false)

  useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  if (!currentLanguage || !languageConfig) {
    return null;
  }

  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload();
  };

  const handleChange = (lang: string) => () => {
    switchLanguage(lang)

  }

  return (
    <div className="text-center notranslate relative w-40 p-4 " onMouseOver={() => setOnOpen(true)} onMouseOut={() => setOnOpen(false)}>
      <div className="absolute top-0 flex flex-col bg-slate-100 transition-all duration-200 shadow-sm p-2 min-w-40 cursor-pointer rounded-lg dark:bg-slate-700  dark:text-white">
        {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
          <div key={i}>
            {currentLanguage === ld.name ||
              (currentLanguage === "auto" &&
                languageConfig.defaultLanguage === ld) ? (
              <span key={`l_s_${ld}`} className="flex items-center backdrop-blur-md mx-3 text-gray-800 dark:text-gray-100 font-lightly" >
                <Globe className="w-4 mr-2" />
                {ld.title}
              </span>
            ) : (

              <div
                key={`l_s_${ld}`}
                onClick={handleChange(ld.name)}
                className={cn("mx-3 transition-all duration-200 h-full backdrop-blur-md  text-gray-500 py-2 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 cursor-pointer", !onOpen && 'h-0 hidden')}
              >

                {ld.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };

