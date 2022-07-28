import { resolve } from 'path';

let Kavenegar = require('kavenegar');

export class UsersUtils {
  private kavenegarapi = Kavenegar.KavenegarApi({
    apikey: process.env.KVN_API_KEY,
  });

  ///create otp code
  otpCreator() {
    let numbers = '0123456789';
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += numbers[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  /// send Otp Sms
  smsSender(phone: string, otp: string) {
    return new Promise((resolve, reject) => {
      return this.kavenegarapi.VerifyLookup(
        {
          receptor: phone,
          token: otp,
          template: process.env.SMS_TEMPLATE,
        },
        (res: any, st: any) => {
          resolve({ status: st, response: res });
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
