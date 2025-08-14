import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
  const navigate = useNavigate();

  const users: User[] = [
    { id:1, name: "Jane Cooper", email: "jane@example.com", role: "Admin", status: "Active" },
    { id:2,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:3,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:4,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:5,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:6,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:7,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:8,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:9,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
    { id:10,name: "John Smith", email: "john@example.com", role: "Editor", status: "Invited" },
  ];

  const handleClick = () => {
    navigate("/users/create");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-600 text-white";
      case "invited":
        return "bg-yellow-500 text-white";
      case "pending":
        return "bg-orange-500 text-white";
      case "inactive":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <>
      <Helmet>
        <title>Users — Admin</title>
        <meta
          name="description"
          content="Browse and manage users in the admin panel."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">All registered users</p>
      </header>

      <div className="pt-2">
        <Button
          type="button"
          className="bg-[#002B6E] flex items-center gap-2"
          onClick={handleClick}
        >
          <UserPlus />
          Add New User
        </Button>
      </div>

      <section aria-labelledby="user-list" className="mt-4">
        <Table className="border border-gray-300 rounded-lg">
          <TableHeader className="bg-[#002B6E]">
            <TableRow>
              <TableHead className="text-white border-b border-gray-300">Name</TableHead>
              <TableHead className="text-white border-b border-gray-300">Email</TableHead>
              <TableHead className="text-white border-b border-gray-300">Role</TableHead>
              <TableHead className="text-white border-b border-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} className="border-b border-gray-200">
                <TableCell className="border-r border-gray-200">{user.name}</TableCell>
                <TableCell className="border-r border-gray-200">{user.email}</TableCell>
                <TableCell className="border-r border-gray-200">{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Users;
