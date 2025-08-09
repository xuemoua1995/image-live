// src/index.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BACKEND_URL: string;
    // add other environment variables here...
  }
}
