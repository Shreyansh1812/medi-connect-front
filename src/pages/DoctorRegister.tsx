
import React, { useState, useEffect } from "react";
import { addDoctor, getPatients, addPatient } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Patient, Doctor } from "@/types/api";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor>({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    patients: [],
  });
  const [patients, setPatients] = useState<Patient[]>([]);
  const [addingPatient, setAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<Patient>({
    name: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    getPatients().then(setPatients).catch(() => setPatients([]));
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setDoctor(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function handlePatientCheck(patient: Patient, checked: boolean) {
    setDoctor(d => {
      const existing = d.patients || [];
      if (checked) {
        return { ...d, patients: [...existing, patient] };
      } else {
        return { ...d, patients: existing.filter(p => p._id !== patient._id) };
      }
    });
  }

  async function handleAddPatient(e: React.FormEvent) {
    e.preventDefault();
    try {
      const added = await addPatient(newPatient);
      setPatients(p => [...p, added]);
      toast({ title: "Patient added" });
      setAddingPatient(false);
      setNewPatient({ name: "", dob: "", gender: "" });
    } catch {
      toast({
        title: "Failed to add patient", description: "Check fields", variant: "destructive"
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoctor(doctor);
      toast({ title: "Doctor registered" });
      navigate("/");
    } catch {
      toast({
        title: "Doctor registration failed",
        description: "Check info and try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Register Doctor</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" placeholder="Doctor Name" value={doctor.name} onChange={handleInput} required />
          <Input name="specialization" placeholder="Specialization" value={doctor.specialization} onChange={handleInput} required />
          <Input name="email" type="email" placeholder="Email" value={doctor.email} onChange={handleInput} required />
          <Input name="phone" placeholder="Phone" value={doctor.phone} onChange={handleInput} required />
          {/* Patients Selection */}
          <div>
            <div className="mb-2 flex justify-between items-center">
              <span className="font-medium">Patients</span>
              <Button type="button" variant="secondary" size="sm" onClick={() => setAddingPatient(a => !a)}>
                {addingPatient ? "Cancel" : "Add New Patient"}
              </Button>
            </div>
            {addingPatient ? (
              <form className="space-y-2 mb-4" onSubmit={handleAddPatient}>
                <Input
                  placeholder="Patient Name"
                  value={newPatient.name}
                  onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))}
                  required
                />
                <Input
                  type="date"
                  placeholder="DOB"
                  value={newPatient.dob}
                  onChange={e => setNewPatient(p => ({ ...p, dob: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Gender"
                  value={newPatient.gender}
                  onChange={e => setNewPatient(p => ({ ...p, gender: e.target.value }))}
                  required
                />
                <Button type="submit" size="sm">Save Patient</Button>
              </form>
            ) : null}
            <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
              {patients.map(patient => (
                <label key={patient._id} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={!!doctor.patients?.find(p => p._id === patient._id)}
                    onChange={e => handlePatientCheck(patient, e.target.checked)}
                  />
                  <span>{patient.name}</span>
                  <span className="text-xs text-gray-400">({patient.gender}, {patient.dob})</span>
                </label>
              ))}
              {patients.length === 0 && <span className="text-gray-400">No patients found.</span>}
            </div>
          </div>
          <Button type="submit" className="w-full">Register Doctor</Button>
        </form>
      </Card>
    </div>
  );
};

export default DoctorRegister;
