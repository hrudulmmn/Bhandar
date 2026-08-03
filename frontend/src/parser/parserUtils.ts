import { REGEX } from "./regex";

export function extractAmount(text: string): number | null {

  const match = text.match(REGEX.amount);

  if (!match) return null;

  return Number(match[1].replace(/,/g, ""));
}

export function extractAccount(text: string): string {

  return text.match(REGEX.account)?.[1] ?? "";
}

export function extractReference(text: string): string | undefined {

  return text.match(REGEX.reference)?.[1];
}

export function extractMerchant(text: string): string {

  const merchant =
    text.match(REGEX.merchant)?.[1];

  if (!merchant) return "";

  return merchant
    .replace(/\.$/, "")
    .trim();
}

export function isDebit(text: string) {

  return REGEX.debit.test(text);

}

export function isCredit(text: string) {

  return REGEX.credit.test(text);

}

export function hasUPI(text: string) {

  return REGEX.upi.test(text);

}

export function detectPaymentApp(text: string) {

  if (REGEX.gpay.test(text))
    return "Google Pay";

  if (REGEX.phonepe.test(text))
    return "PhonePe";

  if (REGEX.paytm.test(text))
    return "Paytm";

  if (REGEX.bhim.test(text))
    return "BHIM";

  return "UNKNOWN";
}