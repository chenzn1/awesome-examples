declare namespace NodeJS {
  interface Global {
    cleanData: boolean
    loadFixtures: boolean
    usedJestResetModules: boolean
    beforeAll(func: Function): void
    afterAll(func: Function): void
  }
}
