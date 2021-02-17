export default Random;

declare class Random {
    static choice(array: any[]): string;
    static choice(str: string): string;
    static fraction(): number;
    static id(charsCount?: number): string;
    static hexString(numberOfDigits: number): string;
    static secret(charsCount?: number): string;
}
