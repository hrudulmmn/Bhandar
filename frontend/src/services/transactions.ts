import api from "./api";

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  app: "GPay" | "PhonePe" | "Paytm" | "BHIM";
  type: "credit" | "debit";
  category: string;
  bank: string;
  upiId: string;
  reference: string;
}

interface BackendTransaction {
  id: number;
  amount: number;
  merchant: string;
  transaction_type: "CREDIT" | "DEBIT";
  transaction_time: string;
  created_at: string;
  bank: string;
  account_last4: string;
  upi_ref_no: string | null;
  payment_app: string | null;
  category: string | null;
}

function convertTransaction(
  transaction: BackendTransaction
): Transaction {
  let app: Transaction["app"] = "GPay";

  if (transaction.payment_app === "PhonePe") {
    app = "PhonePe";
  } else if (transaction.payment_app === "Paytm") {
    app = "Paytm";
  } else if (transaction.payment_app === "BHIM") {
    app = "BHIM";
  }

  return {
    id: transaction.id.toString(),

    merchant: transaction.merchant,

    amount: transaction.amount,

    date: new Date(
      transaction.transaction_time
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),

    app,

    type:
      transaction.transaction_type === "CREDIT"
        ? "credit"
        : "debit",

    category: transaction.category ?? "Other",

    bank: transaction.bank,

    upiId: transaction.upi_ref_no ?? "",

    reference: transaction.upi_ref_no ?? "",
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get("/transactions/");

  return response.data.map(
    (transaction: BackendTransaction) =>
      convertTransaction(transaction)
  );
}

export async function getTransaction(
  id: string
): Promise<Transaction> {
  const response = await api.get(
    `/transactions/${id}`
  );

  return convertTransaction(response.data);
}