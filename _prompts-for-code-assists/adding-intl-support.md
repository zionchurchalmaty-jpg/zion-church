Add support for Internationalization to support additional site language

- Primary language is English, the secondary language is Russian
- use url sub-route approach, e.g. `/` - English (default), `/ru` - Russian
- use https://next-intl.dev/ to implement this support
- see existing UI for language switch /Users/saidakhmedbayev/codeproj/goodnewsbible/components/navbar.tsx
- go through all translatable strings and wrap them in `t()` function and create all necessary dictionaries. Do not skip any front end translatable strings, do a good job here
