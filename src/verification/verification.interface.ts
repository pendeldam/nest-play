export interface VerificationData {
  code: string;
  type: string;
}

export enum VerificationCodeTypes {
  SMS = 'sms',
  EMAIL = 'email',
}

export const VerificationCodeTTL = {
  DEFAULT: new Date(Date.now() + 60 * 1000),
};
