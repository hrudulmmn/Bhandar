export const REGEX = {

  amount:
    /(?:Rs\.?|INR)\s*([\d,]+(?:\.\d{1,2})?)/i,

  debit:
    /\bdebited\b/i,

  credit:
    /\bcredited\b/i,

  upi:
    /\bupi\b/i,

  account:
    /(?:A\/C|A\/c|Acct|Account).*?([0-9]{4})/i,

  reference:
    /(?:UPI\s*Ref(?:erence)?(?:\s*No)?|Ref(?:\s*No)?)[:\s]*([A-Za-z0-9]+)/i,

  merchant:
    /\b(?:to|from)\s+([A-Za-z0-9 .&-]+)/i,

  gpay:
    /google\s*pay|gpay/i,

  phonepe:
    /phonepe/i,

  paytm:
    /paytm/i,

  bhim:
    /bhim/i,

};