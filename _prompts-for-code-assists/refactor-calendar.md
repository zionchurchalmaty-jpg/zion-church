Add new content type for calendar events follow implementation for blog or song content types, see here '/Users/saidakhmedbayev/codeproj/zion-church/app/admin/blog'

- use best practices for adding necessary fields (data shape) for calendar event type contents, but keep it simple. Use Russian based calendar and time format.
- make calendar events listing page here '/Users/saidakhmedbayev/codeproj/zion-church/app/[locale]/events', follow implementation for blog listing page, see here '/Users/saidakhmedbayev/codeproj/zion-church/app/[locale]/blog/page.tsx'. The most close events must be shown at the top of the page, auto-hide events that in the past. Add optional event repeat settings with custom option and all-day option
- refactor calendar-section component '/Users/saidakhmedbayev/codeproj/zion-church/components/calendar-section.tsx' to use new (database-based) events instead of hard-coded data
