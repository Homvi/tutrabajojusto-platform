<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\App;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user && $user->isCompany()) {
            $user->load('companyProfile');
        }

        return array_merge(parent::share($request), [
            // Share the authenticated user's data on every request
            'auth' => [
                // The 'user' will be the user object if logged in, or null if a guest.
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'is_admin' => $request->user()->is_admin,
                    'companyProfile' => $user->companyProfile,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'locale' => App::getLocale(),
            'messages' => function () {
                $locale = App::getLocale();
                $file = lang_path("$locale.json");
                if (File::exists($file)) {
                    return json_decode(File::get($file), true);
                }
                return [];
            },
        ]);
    }
}
