import { apiUrl } from "./httpClient";

export async function bulkUploadTransactions(transactions) {
  const resp = await fetch(apiUrl("/api/transactions/bulk"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactions })
  });
  if (!resp.ok) throw new Error("Bulk upload failed");
  return resp.json();
}

export async function fetchTransactions(params = {}) {
  const query = new URLSearchParams(params).toString();
  const resp = await fetch(apiUrl(`/api/transactions${query ? `?${query}` : ""}`));
  if (!resp.ok) throw new Error("Failed to load transactions");
  return resp.json();
}
