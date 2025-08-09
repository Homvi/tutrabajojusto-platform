<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;
use RectorLaravel\Set\LaravelSetList;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__ . '/app',
    ]);

    // Define sets of rules
    $rectorConfig->sets([
        SetList::DEAD_CODE,
        SetList::EARLY_RETURN,
        SetList::TYPE_DECLARATION,
        SetList::CODE_QUALITY,
        SetList::CODING_STYLE,
        LevelSetList::UP_TO_PHP_82,
        LaravelSetList::LARAVEL_100,
    ]);

    // Skip certain paths
    $rectorConfig->skip([
        __DIR__ . '/app/Http/Controllers/Auth/*',
        __DIR__ . '/tests/*',
        __DIR__ . '/vendor/*',
        __DIR__ . '/storage/*',
        __DIR__ . '/bootstrap/*',
        __DIR__ . '/database/*',
        __DIR__ . '/public/*',
    ]);
};
