export enum VerificationCodeTypes {
  EMAIL = 'email',
}

export const VerificationCodeTTL = {
  DEFAULT: new Date(Date.now() + 120 * 1000),
};
