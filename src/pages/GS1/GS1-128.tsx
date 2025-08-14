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
import { PlusCircle } from "lucide-react";

interface GS1Item {
  name: string;
  category: string;
  contact: string;
  status: string;
}

const GS1 = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
  const navigate = useNavigate();

  const gs1List: GS1Item[] = [
    { name: "Acme Corp", category: "Retail", contact: "ops@acme.com", status: "Active" },
    { name: "Sunrise Cafe", category: "Hospitality", contact: "hello@sunrise.cafe", status: "Pending" },
  ];

  const handleClick = () => {
    navigate("/member/create"); // Navigate to create new GS1 barcode
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-600 text-white";
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
        <title>GS1-128 — Admin</title>
        <meta name="description" content="View and manage GS1-128 barcodes." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">GS1-128 Barcode</h1>
        <p className="text-muted-foreground mt-1">All GS1-128 barcodes</p>
      </header>

      <div className="pt-2">
        <Button
          type="button"
          className="bg-[#002B6E] flex items-center gap-2"
          onClick={handleClick}
        >
          <PlusCircle />
          Add Barcode
        </Button>
      </div>

      <section aria-labelledby="gs1-list" className="mt-4">
        <Table className="border border-gray-300 rounded-lg">
          <TableHeader className="bg-[#002B6E]">
            <TableRow>
              <TableHead className="text-white border-b border-gray-300">Name</TableHead>
              <TableHead className="text-white border-b border-gray-300">Category</TableHead>
              <TableHead className="text-white border-b border-gray-300">Contact</TableHead>
              <TableHead className="text-white border-b border-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gs1List.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-200">
                <TableCell className="border-r border-gray-200">{item.name}</TableCell>
                <TableCell className="border-r border-gray-200">{item.category}</TableCell>
                <TableCell className="border-r border-gray-200">{item.contact}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
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

export default GS1;
