export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export interface SMSMessage {
  id: string;

  address: string;

  body: string;

  date: number;
}

export interface ParsedTransaction {
  amount: number;

  merchant: string;

  transaction_type: TransactionType;

  transaction_time: Date;

  bank: string;

  account_last4: string;

  upi_ref_no?: string;

  payment_app?: string;
}

export interface BankParser {

  canParse(message: SMSMessage): boolean;

  parse(message: SMSMessage): ParsedTransaction | null;

}