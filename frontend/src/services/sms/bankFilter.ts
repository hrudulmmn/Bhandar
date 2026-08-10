import { SMSMessage } from "./smsReader";

export type Bank = "SBI" | "CANARA";

export interface BankSMS {
  sms: SMSMessage;
  bank: Bank;
}

export function identifyBank(
  sms: SMSMessage
): Bank | null {
  const sender = sms.address.toUpperCase();
  const body = sms.body.toUpperCase();

  if (
    sender.includes("SBIINB") ||
    sender.includes("SBI") ||
    body.includes("SBI")
  ) {
    return "SBI";
  }

  if (
    sender.includes("CANBNK") ||
    sender.includes("CANARA") ||
    body.includes("CANARABANK")
  ) {
    return "CANARA";
  }

  return null;
}

export function isTransactionSMS(
  sms: SMSMessage
): boolean {
  const body = sms.body.toUpperCase();

  const transactionPatterns = [
    /\bCREDITED\b/,
    /\bDEBITED\b/,
    /\bTRF\b/,
    /\bTRANSFERRED\b/,
    /\bUPI\b.*\bREF\b/,
    /\bREF(?:NO| NO)\b/,
  ];

  return transactionPatterns.some(
    (pattern) => pattern.test(body)
  );
}