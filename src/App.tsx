
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorRegister from "./pages/DoctorRegister";
import Patients from "./pages/Patients";
import PatientHistory from "./pages/PatientHistory";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: React.ReactNode }) {
  const authed = !!localStorage.getItem("token");
  return authed ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Index />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-register" element={
            <RequireAuth>
              <DoctorRegister />
            </RequireAuth>
          } />
          <Route path="/patients" element={
            <RequireAuth>
              <Patients />
            </RequireAuth>
          } />
          <Route path="/patient-history" element={
            <RequireAuth>
              <PatientHistory />
            </RequireAuth>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
