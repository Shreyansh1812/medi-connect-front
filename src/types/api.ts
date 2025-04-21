
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    // Add more user fields if present
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface Doctor {
  _id?: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  patients?: Patient[];
}

export interface Patient {
  _id?: string;
  name: string;
  dob: string;
  gender: string;
  // add other fields as per your backend, if any
}

export interface PatientHistoryEntry {
  _id: string;
  patientId: string;
  diagnosis: string;
  treatment: string;
  date: string;
  // add fields as in patient_hist.js
}
