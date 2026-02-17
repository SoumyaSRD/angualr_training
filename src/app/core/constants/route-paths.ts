/**
 * Centralized route paths for type-safe navigation and guards.
 * Use these constants instead of string literals in routes and links.
 */
export const ROUTE_PATHS = {
  home: '',
  fundamentals: 'fundamentals',
  routing: {
    basics: 'routing/basics',
    guard: 'routing/basics/guard',
  },
  forms: {
    formModule: 'forms/form-module',
    reactiveForms: 'forms/reactive-forms',
    formValidation: 'forms/form-validation',
  },
  prerequisites: {
    howBrowsersWork: 'prerequisites/web-fundamentals/how-browsers-work',
    httpHttps: 'prerequisites/web-fundamentals/http-https',
    restApis: 'prerequisites/web-fundamentals/rest-apis',
    json: 'prerequisites/web-fundamentals/json',
    cors: 'prerequisites/web-fundamentals/cors',
    tsVsJs: 'prerequisites/typescript/typescript-vs-javascript',
    dataTypes: 'prerequisites/typescript/data-types',
    interfaces: 'prerequisites/typescript/interfaces',
    enums: 'prerequisites/typescript/enums',
    classes: 'prerequisites/typescript/classes',
  },
} as const;
