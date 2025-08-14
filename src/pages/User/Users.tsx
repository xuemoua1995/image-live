import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {  UserPlus, Building2, PlusCircle } from "lucide-react";
const Users = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
   const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/users/create"); // <-- navigate to another page
    }, 1000); // simulate async action
  };
  return (
    <>
      <Helmet>
        <title>Users — Admin</title>
        <meta name="description" content="Browse and manage users in the admin panel." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">All registered users</p>
      </header>

       <div className="pt-2">
          <Button type="submit" onClick={handleClick} disabled={loading}>
            <UserPlus/>{loading ? "Add..." : "Add User"}
          </Button>
        </div>

      <section aria-labelledby="user-list">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jane Cooper</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Editor</TableCell>
              <TableCell>Invited</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Users;
