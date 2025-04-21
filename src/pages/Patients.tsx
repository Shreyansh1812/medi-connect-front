
import React, { useEffect, useState } from "react";
import { getPatients } from "@/api";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { Patient } from "@/types/api";

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients()
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Patients</h2>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {patients.map((p) => (
              <Card key={p._id} className="flex items-center gap-4 p-4">
                <User className="text-blue-500 bg-blue-50 rounded-full w-10 h-10 p-2" />
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-gray-500 text-sm">
                    Gender: {p.gender} | DOB: {p.dob}
                  </div>
                  {p._id && (
                    <a
                      href={`/patient-history?id=${p._id}`}
                      className="text-blue-600 underline text-sm"
                    >
                      View History
                    </a>
                  )}
                </div>
              </Card>
            ))}
            {patients.length === 0 && <div className="text-gray-500">No patients found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
