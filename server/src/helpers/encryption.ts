import * as crypto from 'crypto';

class Encryption {
  encrypt(password: string, secretKey: string) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(secretKey.substring(0, 32)),
      iv,
    );

    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return {
      iv: iv.toString('hex'),
      password: encryptedPassword.toString('hex'),
    };
  }

  decrypt(encryption: { password: string; iv: string }, secretKey: string) {
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      Buffer.from(secretKey.substring(0, 32)),
      Buffer.from(encryption.iv, 'hex'),
    );

    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(encryption.password, 'hex')),
      decipher.final(),
    ]);

    return decryptedPassword.toString('utf8');
  }
}

export default new Encryption();
