import { sha512 } from 'sha512-crypt-ts';

export class DuegevEncryptor {
    private static generateRandomSalt(): string {
        const alphabet: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ./';
        const length: number = 8 + Math.random() * 8;
        let result = '';
        for (let i = length; i > 0; --i) { result += alphabet[Math.floor(Math.random() * alphabet.length)]; }
        return result;
    }

    public static SHA512Encrypt(word: string, salt: string = 'random'): string {
        salt = salt === 'random'
            ? DuegevEncryptor.generateRandomSalt()
            : salt;
        return sha512.crypt(word, salt);
    }

    public static generateRandomString(length: number): string {
        const alphabet: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) { result += alphabet[Math.floor(Math.random() * alphabet.length)]; }
        return result;
    }
}