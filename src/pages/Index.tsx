import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>Dashboard — Admin</title>
        <meta name="description" content="Dashboard overview of users and merchants." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-white mt-1">Quick insights and shortcuts</p>
      </header>

      <section aria-labelledby="stats" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow hover:shadow-lg bg-blue-600 text-white">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">1,248</div>
            <p className="text-sm text-white mt-1">+3.2% from last week</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg bg-green-600 text-white">
          <CardHeader>
            <CardTitle>Active Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">312</div>
            <p className="text-sm text-white mt-1">Stable this month</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg bg-orange-600 text-white">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">8</div>
            <p className="text-sm text-white mt-1">Review required</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8" aria-labelledby="quick-actions">
        <h2 id="quick-actions" className="text-xl font-semibold mb-3">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/users/create">Create User</Link>
          </Button>
          <Button asChild>
            <Link to="/merchants/create">Create Merchant</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/users">View Users</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/merchants">View Merchants</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
