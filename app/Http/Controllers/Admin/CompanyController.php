<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    /**
     * Display a listing of all companies for validation.
     */
    public function index(): Response
    {
        $companies = CompanyProfile::query()
            ->with('user:id,name,email') // Eager load user data
            ->orderBy('is_validated', 'asc') // Show unvalidated companies first
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Company/Index', [
            'companies' => $companies,
        ]);
    }

    /**
     * Validate a company profile.
     */
    public function validateCompany(CompanyProfile $company): RedirectResponse
    {
        $company->update(['is_validated' => true]);

        // We can add an email notification to the company later if needed.

        return redirect()->route('admin.companies.index')->with('success', 'Company validated successfully.');
    }
}
