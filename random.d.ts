declare module "@inway/meteor-random" {
  declare namespace Random {
    function choice<T>(array: T[]): string;
    function choice(str: string): string;
    function fraction(): number;
    function id(charsCount?: number): string;
    function hexString(numberOfDigits: number): string;
    function secret(charsCount?: number): string;
  }
}
