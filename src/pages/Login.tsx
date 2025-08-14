import { Helmet } from "react-helmet-async";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canonical = `${window.location.origin}${location.pathname}`;
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Signed in (demo)");
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

      <div className="min-h-screen grid place-items-center bg-background">
        <Card className="w-full max-w-md shadow-sm">
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <Button className="bg-blue-600" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Back to home</Link>
            <span>Forgot password?</span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
