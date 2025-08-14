import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartNoAxesCombined,
  UserPen,
  UserRoundCheck,
  BookUser,
  UserRoundSearch,
  Newspaper,
} from "lucide-react";
const Index = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>Dashboard — Admin</title>
        <meta
          name="description"
          content="Dashboard overview of users and merchants."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-white mt-1">Quick insights and shortcuts</p>
      </header>

      <section
        aria-labelledby="stats"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Link to="/users">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-blue-600 text-white">
            {/* Background Icon */}
            <UserPen className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">1,248</div>
              <p className="text-sm text-white mt-1">+3.2% from last week</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/member">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-green-600 text-white">
            {/* Background Icon */}
            <UserRoundCheck className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">28</div>
              <p className="text-sm text-white mt-1">+3.2% from last month</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/users">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-orange-600 text-white">
            {/* Background Icon */}
            <BookUser className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">15</div>
              <p className="text-sm text-white mt-1">Review required</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/member">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-purple-600 text-white">
            {/* Background Icon */}
            <UserRoundSearch className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">100</div>
              <p className="text-sm text-white mt-1">Review required</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/news">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-[#002B6E] text-white">
            {/* Background Icon */}
            <Newspaper className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Total News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">9</div>
              <p className="text-sm text-white mt-1">Review required</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/gs1-128">
          <Card className="relative overflow-hidden transition-shadow hover:shadow-lg bg-red-600 text-white">
            {/* Background Icon */}
            <ChartNoAxesCombined className="absolute right-4 bottom-4 w-20 h-20 text-white/20 pointer-events-none" />

            <CardHeader>
              <CardTitle>Revnue Barcode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">$10,000</div>
              <p className="text-sm text-white mt-1">Review required</p>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="mt-8" aria-labelledby="quick-actions">
        <h2 id="quick-actions" className="text-xl font-semibold mb-3">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/users/create">Create User</Link>
          </Button>
          <Button asChild>
            <Link to="/member/create">Create Member</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/users">View Users</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/member">View Members</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
