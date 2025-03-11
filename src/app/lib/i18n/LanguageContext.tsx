'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define supported languages
export type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = 'tr';

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize with browser language if available, otherwise use Turkish
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const detectLanguage = (): Language => {
      // Check localStorage first
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'tr'].includes(savedLanguage)) {
        return savedLanguage;
      }

      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'tr' ? 'tr' : 'en';
    };

    const detectedLanguage = detectLanguage();
    setLanguage(detectedLanguage);
  }, []);

  useEffect(() => {
    // Load translations based on the selected language
    const loadTranslations = async () => {
      try {
        const translations = await import(`./translations/${language}.json`);
        setTranslations(translations.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
    
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 