declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: URL
      API_EMAIL: string
      API_PW: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }