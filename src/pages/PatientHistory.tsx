
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPatientHistory } from "@/api";
import { Card } from "@/components/ui/card";
import { PatientHistoryEntry } from "@/types/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PatientHistory = () => {
  const query = useQuery();
  const patientId = query.get("id");
  const [history, setHistory] = useState<PatientHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) {
      getPatientHistory(patientId)
        .then(setHistory)
        .finally(() => setLoading(false));
    }
  }, [patientId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Patient History</h2>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="space-y-4">
            {history.map(entry => (
              <Card key={entry._id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{entry.diagnosis}</div>
                    <div className="text-gray-500 text-sm">{entry.treatment}</div>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
            {history.length === 0 && <div className="text-gray-400">No history found for this patient.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;
