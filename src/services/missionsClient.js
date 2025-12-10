import { apiUrl } from "./httpClient";

export async function fetchMissions() {
  const resp = await fetch(apiUrl("/api/missions"));
  if (!resp.ok) throw new Error("Failed to load missions");
  return resp.json();
}

export async function createMission(payload) {
  const resp = await fetch(apiUrl("/api/missions"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error("Failed to create mission");
  return resp.json();
}

export async function updateMissionStatus(id, status) {
  const resp = await fetch(apiUrl(`/api/missions/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!resp.ok) throw new Error("Failed to update mission");
  return resp.json();
}
