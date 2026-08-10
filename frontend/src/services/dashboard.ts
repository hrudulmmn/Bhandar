import api from "./api";

export interface DashboardData {
  total_credit: number;
  total_debit: number;
  transaction_count: number;
  recent_trans: any[];
}

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get(
    "/transactions/dashboard"
  );

  return response.data;
}