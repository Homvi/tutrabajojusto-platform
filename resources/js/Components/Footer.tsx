import React from 'react';
import { Link } from '@inertiajs/react';
import { LanguageToggle } from '@/Components/LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="w-full self-stretch border-t py-8 bg-background">
            <div className="w-full px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} TuTrabajoJusto. {t('All rights reserved.')}
                </p>
                <div className="flex items-center gap-4">
                    <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                        {t('Terms of Service')}
                    </Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                        {t('Privacy Policy')}
                    </Link>
                    <LanguageToggle />
                </div>
            </div>
        </footer>
    );
}

 
