import {
  BankParser,
  ParsedTransaction,
  SMSMessage,
  TransactionType,
} from "../types";

export class SBIParser implements BankParser {
  // Matches:
  // "credited by Rs.2.00"
  // "debited by 526.83"
  private amountRegex =
    /(?:credited|debited)\s+by\s+(?:Rs\.?\s*)?([\d,]+(?:\.\d{2})?)/i;

  // Matches:
  // "A/c X4471"
  private accountRegex =
    /A\/C\s+X(\d{4})/i;

  // Matches:
  // "transfer from Google Play Ref No 892445161706"
  private creditMerchantRegex =
    /from\s+(.+?)\s+Ref\s*No/i;

  // Matches:
  // "trf to ZOMATO LTD Refno 002675555380"
  private debitMerchantRegex =
    /trf\s+to\s+(.+?)\s+Refno/i;

  // Matches:
  // "Ref No 892445161706"
  // "Refno 002675555380"
  private referenceRegex =
    /\bRef\s*No\.?\s*(\d+)|\bRefno\s*(\d+)/i;

  canParse(message: SMSMessage): boolean {
    const sender = message.address.toUpperCase();
    const body = message.body.toLowerCase();

    // Must be an SBI SMS
    if (!sender.includes("SBI")) {
      return false;
    }

    // Ignore UPI mandate messages.
    // These are NOT completed transactions.
    if (
      body.includes("upi-mandate") ||
      body.includes("upi mandate") ||
      body.includes("mandate successfully") ||
      body.includes("mandate is successfully") ||
      body.includes("mandate cancelled")
    ) {
      return false;
    }

    // Only accept actual credit/debit messages
    return (
      body.includes("credited") ||
      body.includes("debited")
    );
  }

  parse(message: SMSMessage): ParsedTransaction | null {
    const body = message.body;

    const isCredit =
      body.toLowerCase().includes("credited");

    const isDebit =
      body.toLowerCase().includes("debited");

    // Must explicitly be a credit or debit
    if (!isCredit && !isDebit) {
      return null;
    }

    const amount =
      body.match(this.amountRegex)?.[1];

    if (!amount) {
      return null;
    }

    const account =
      body.match(this.accountRegex)?.[1] ?? "";

    const merchantMatch = isCredit
      ? body.match(this.creditMerchantRegex)
      : body.match(this.debitMerchantRegex);

    const merchant =
      merchantMatch?.[1]?.trim() ?? "UNKNOWN";

    const referenceMatch =
      body.match(this.referenceRegex);

    const reference =
      referenceMatch?.[1] ??
      referenceMatch?.[2];

    return {
      amount: Number(
        amount.replace(/,/g, "")
      ),

      merchant,

      transaction_type: isCredit
        ? TransactionType.CREDIT
        : TransactionType.DEBIT,

      transaction_time: new Date(message.date),

      bank: "SBI",

      account_last4: account,

      upi_ref_no: reference,

      payment_app: "UNKNOWN",
    };
  }
}