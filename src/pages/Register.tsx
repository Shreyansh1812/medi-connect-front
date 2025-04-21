
import React, { useState } from "react";
import { register } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast({ title: "Registration successful" });
      navigate("/login");
    } catch {
      toast({
        title: "Registration failed",
        description: "Check your info and try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">MediTrack Register</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="text-sm mt-6 text-center">
          Already have an account?
          <button
            className="ml-2 text-blue-600 underline"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
        </p>
      </Card>
    </div>
  );
};

export default Register;
