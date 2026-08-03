import {
  BankParser,
  ParsedTransaction,
  SMSMessage,
  TransactionType,
} from "../types";

export class CanaraParser implements BankParser {

private creditAmountRegex =
/credited\s+with\s+INR\s+([\d,]+(?:\.\d{2})?)/i;

private debitAmountRegex =
/Dr\.\s*INR\s*([\d,]+(?:\.\d{2})?)/i;

private accountRegex =
/Acct\s*X+(\d{4})/i;

private creditMerchantRegex =
/from\s+(.+?);/i;

private debitMerchantRegex =
/to\s+(.+?);/i;

private upiRegex =
/UPI:\s*([0-9]+)/i;

  canParse(message: SMSMessage): boolean {

    const sender = message.address.toUpperCase();

    return (
      sender.includes("CANARABANK") ||
      sender.includes("CANBNK")||
      sender.includes("CAN")
    );

  }

  parse(message: SMSMessage): ParsedTransaction | null {

  const body = message.body;

  const isCredit = body.toLowerCase().includes("credited");

  const amount = isCredit
    ? body.match(this.creditAmountRegex)?.[1]
    : body.match(this.debitAmountRegex)?.[1];

  if (!amount) return null;

  const merchant = isCredit
    ? body.match(this.creditMerchantRegex)?.[1]
    : body.match(this.debitMerchantRegex)?.[1];

  const account =
    body.match(this.accountRegex)?.[1] ?? "";

  const reference =
    body.match(this.upiRegex)?.[1];

  return {

    amount: Number(amount.replace(/,/g, "")),

    merchant: merchant?.trim() ?? "UNKNOWN",

    transaction_type: isCredit
      ? TransactionType.CREDIT
      : TransactionType.DEBIT,

    transaction_time: new Date(message.date),

    bank: "CANARA",

    account_last4: account,

    upi_ref_no: reference,

    payment_app: "UNKNOWN",

  };

}
  }
