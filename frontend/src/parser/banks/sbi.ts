import {
  BankParser,
  ParsedTransaction,
  SMSMessage,
  TransactionType,
} from "../types";

export class SBIParser implements BankParser {

  private amountRegex =
/(?:credited|debited)\s+by\s+(?:Rs\.?)?\s*([\d,]+(?:\.\d{2})?)/i;

private accountRegex =
/A\/C?\s*X(\d{4})/i;

private creditMerchantRegex =
/from\s+(.+?)\s+Ref/i;

private debitMerchantRegex =
/trf\s+to\s+(.+?)\s+Refno/i;

private referenceRegex =
/Ref\s*No|Refno\s*([A-Za-z0-9]+)/i;

  canParse(message: SMSMessage): boolean {

    const sender = message.address.toUpperCase();

    return (
      sender.includes("SBI") &&(
      message.body.toLowerCase().includes("credited") ||
      message.body.toLowerCase().includes("debited")
      )
    );

  }

  parse(message: SMSMessage): ParsedTransaction | null {

    const body = message.body;

    const amount =
      body.match(this.amountRegex)?.[1];

    if (!amount)
      return null;

    const account =
      body.match(this.accountRegex)?.[1] ?? "";

    const merchant = (body.toLowerCase().includes("credited")
        ? body.match(this.creditMerchantRegex)?.[1]
        : body.match(this.debitMerchantRegex)?.[1])?.trim() ?? "UNKNOWN";

    const reference =
      body.match(this.referenceRegex)?.[1];

    return {

      amount: Number(amount.replace(/,/g, "")),

      merchant,

      transaction_type:
        body.toLowerCase().includes("credited")
          ? TransactionType.CREDIT
          : TransactionType.DEBIT,

      transaction_time:
        new Date(message.date),

      bank: "SBI",

      account_last4: account,

      upi_ref_no: reference,

      payment_app: "UNKNOWN",

    };

  }

}