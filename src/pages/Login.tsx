
import React, { useState } from "react";
import { login } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem("token", res.token);
      toast({ title: "Login successful" });
      navigate("/");
    } catch {
      toast({ title: "Invalid credentials", description: "Try again.", variant: "destructive" });
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">MediTrack Login</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
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
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <p className="text-sm mt-6 text-center">
          Don&apos;t have an account?
          <button
            className="ml-2 text-blue-600 underline"
            onClick={() => navigate("/register")}
            type="button"
          >
            Register
          </button>
        </p>
      </Card>
    </div>
  );
};

export default Login;
