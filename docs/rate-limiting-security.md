# Rate Limiting Security Implementation

This document describes the rate limiting security measures implemented to protect sensitive endpoints from abuse.

## Overview

Rate limiting has been implemented on all sensitive endpoints to prevent:
- Brute force attacks on authentication endpoints
- Spam registration attempts
- Abuse of password reset functionality
- Excessive language switching requests

## Implemented Rate Limits

### Authentication Endpoints

| Endpoint | Rate Limit | Description |
|----------|------------|-------------|
| `POST /login` | 5 attempts per email+IP | Built-in Laravel rate limiting in `LoginRequest` |
| `POST /register-job-seeker` | 3 requests/minute per IP | Registration for job seekers |
| `POST /register-company` | 3 requests/minute per IP | Registration for companies |
| `POST /forgot-password` | 3 requests/minute per IP | Password reset requests |
| `POST /reset-password` | 3 requests/minute per IP | Password reset form submission |
| `PUT /password` | 3 requests/minute per IP | Password update (authenticated users) |
| `POST /confirm-password` | 5 requests/minute per IP | Password confirmation |

### Other Sensitive Endpoints

| Endpoint | Rate Limit | Description |
|----------|------------|-------------|
| `POST /language/switch` | 10 requests/minute per IP | Language switching |

### Already Protected Endpoints

| Endpoint | Rate Limit | Description |
|----------|------------|-------------|
| `GET /verify-email/{id}/{hash}` | 6 requests/minute per IP | Email verification (already implemented) |
| `POST /email/verification-notification` | 6 requests/minute per IP | Resend verification email (already implemented) |

## Technical Implementation

### Middleware Configuration

Rate limiting is implemented using Laravel's built-in `throttle` middleware:

```php
// Example: 3 requests per minute per IP
Route::post('/endpoint', [Controller::class, 'method'])
    ->middleware('throttle:3,1');
```

### Rate Limiting Strategy

1. **IP-based throttling**: Most endpoints use IP-based rate limiting
2. **Email+IP combination**: Login attempts use a combination of email and IP (implemented in `LoginRequest`)
3. **Sliding window**: Laravel uses a sliding window approach for rate limiting

### Configuration Files

- **Routes**: Rate limiting is configured directly in route definitions
- **Login Logic**: Special rate limiting logic in `app/Http/Requests/Auth/LoginRequest.php`

## Rate Limiting Responses

When rate limits are exceeded, the application responds with:

- **HTTP 429 (Too Many Requests)**: Standard rate limiting response
- **HTTP 422 (Unprocessable Entity)**: For login attempts, includes throttle error message

## Testing

### Automated Tests

Rate limiting functionality is tested in `tests/Feature/RateLimitingTest.php`:

- Language switch endpoint rate limiting
- Password reset request rate limiting  
- Password update rate limiting
- Confirm password rate limiting
- Login rate limiting verification

### Manual Testing

Use the provided manual test script:

```bash
php test_rate_limiting_manual.php
```

## Security Considerations

### Rate Limit Values

The chosen rate limits balance security with user experience:

- **Login attempts**: 5 per email+IP combination prevents brute force while allowing legitimate retries
- **Registration**: 3 per minute prevents spam but allows legitimate multiple attempts
- **Password operations**: 3 per minute prevents abuse while allowing normal usage
- **Language switching**: 10 per minute allows normal usage patterns

### Bypass Prevention

- Rate limits are enforced at the application level
- Cannot be easily bypassed through different routes
- IP-based tracking makes it harder to circumvent

## Monitoring and Maintenance

### Recommended Monitoring

1. **Rate limit hits**: Monitor 429 responses to identify potential attacks
2. **False positives**: Watch for legitimate users being rate limited
3. **Attack patterns**: Analyze rate limit violations for security threats

### Adjusting Rate Limits

To modify rate limits, update the middleware configuration in route files:

```php
// Change from 3 to 5 requests per minute
Route::post('/endpoint', [Controller::class, 'method'])
    ->middleware('throttle:5,1');
```

### Custom Rate Limiting

For more complex rate limiting needs, consider:

1. **User-based rate limiting**: Different limits for authenticated vs. guest users
2. **Dynamic rate limiting**: Adjust limits based on user behavior
3. **Redis-based tracking**: For distributed applications

## Related Security Features

This rate limiting implementation works alongside other security measures:

- CSRF protection
- Input validation
- SQL injection prevention (Eloquent ORM)
- XSS protection
- Secure password hashing

## Troubleshooting

### Common Issues

1. **Too restrictive**: Users reporting legitimate requests being blocked
   - Solution: Increase rate limits or implement user-specific limits

2. **Not restrictive enough**: Continued abuse despite rate limiting
   - Solution: Decrease rate limits or implement additional security measures

3. **Testing failures**: Rate limiting tests failing
   - Solution: Ensure proper test isolation and rate limiter clearing

### Debugging

To debug rate limiting issues:

1. Check route definitions for correct middleware
2. Verify rate limiter cache is working
3. Test with different IP addresses
4. Monitor application logs for rate limit violations

## Implementation Checklist

- [x] Login endpoint rate limiting (built-in Laravel)
- [x] Registration endpoints rate limiting
- [x] Password reset/change endpoints rate limiting  
- [x] Language switch endpoint rate limiting
- [x] Automated tests for rate limiting
- [x] Documentation for configuration
- [ ] Production monitoring setup
- [ ] Rate limit alerting configuration
