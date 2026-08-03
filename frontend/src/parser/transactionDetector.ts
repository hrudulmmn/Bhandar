const REQUIRED = [

  "upi",

  "debited",

  "credited",

];

const IGNORE = [

  "otp",

  "one time password",

  "offer",

  "discount",

  "loan",

  "reward",

  "cashback",

  "credit card",

  "statement",

];

export function isTransactionSMS(body: string) {

  const text = body.toLowerCase();

  if (
    IGNORE.some(word =>
      text.includes(word)
    )
  ) {
    return false;
  }

  return REQUIRED.some(word =>
    text.includes(word)
  );
}