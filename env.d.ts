declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly NODE_ENV: "development" | "production" | "test";
    readonly VITEST?: string;
  }
}
