
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Doctor,
  Patient,
  PatientHistoryEntry
} from "@/types/api";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// AUTH
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function register(data: RegisterRequest): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return await res.json();
}

// Doctor Registration (/addDoc)
export async function addDoctor(data: Doctor): Promise<any> {
  const res = await fetch(`${API_BASE}/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Add doctor failed");
  return await res.json();
}

// PATIENTS
export async function getPatients(): Promise<Patient[]> {
  const res = await fetch(`${API_BASE}/patients`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return await res.json();
}

export async function addPatient(data: Patient): Promise<any> {
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Add patient failed");
  return await res.json();
}

// Patient History
export async function getPatientHistory(patientId: string): Promise<PatientHistoryEntry[]> {
  const res = await fetch(`${API_BASE}/patient_hist/${patientId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch patient history");
  return await res.json();
}
