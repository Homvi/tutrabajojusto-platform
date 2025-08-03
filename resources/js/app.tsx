import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';

import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName = import.meta.env.VITE_APP_NAME || 'TutrabajoJusto';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const { locale, messages } = props.initialPage.props;

        // 1. Determine the current locale safely
        const currentLocale = typeof locale === 'string' ? locale : 'en';

        // 2. Create the 'files' object in the expected format
        const translationFiles = {
            [currentLocale]: messages,
        };

        root.render(
            // 3. Pass 'currentLocale' and 'translationFiles' to the provider
            <LaravelReactI18nProvider
                locale={currentLocale}
                files={translationFiles}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <App {...props} />
                </ThemeProvider>
            </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
