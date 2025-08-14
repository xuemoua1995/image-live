import { Helmet } from "react-helmet-async";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canonical = `${window.location.origin}${location.pathname}`;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");

  if (!email || !password) return;
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    toast.success("Signed in (demo)", {
      style: {
        background: "#22c55e", // Tailwind green-500
        color: "white",
        fontWeight: "bold",
      },
    });
    navigate("/dashboard");
  }, 700);
};

  return (
    <>
      <Helmet>
        <title>Sign in — Admin</title>
        <meta name="description" content="Sign in to access your admin dashboard." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div
        className="min-h-screen grid place-items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://static.mayorsofeurope.eu/uploads/2022/03/public-transport-europe-scaled.jpg')",
        }}
      >
        <Card className="w-full max-w-md shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle>Welcome back</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button className="bg-blue-600" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Term and condition</Link>
            <Link to="/" className="hover:underline">Forgot password?</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
