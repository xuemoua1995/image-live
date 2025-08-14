import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {  PlusCircle } from "lucide-react";
const GLN = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
   const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/member/create"); // <-- navigate to another page
    }, 1000); // simulate async action
  };
  return (
    <>
      <Helmet>
        <title>GLN — Admin</title>
        <meta name="description" content="View and manage merchant accounts." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">GLN barcode</h1>
        <p className="text-muted-foreground mt-1">All GLN barcode</p>
      </header>
       <div className="pt-2">
          <Button type="submit" onClick={handleClick} disabled={loading}>
            <PlusCircle/>{loading ? "Add Merchant..." : "Add Merchant"}
          </Button>
        </div>

      <section aria-labelledby="merchant-list">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Acme Corp</TableCell>
              <TableCell>Retail</TableCell>
              <TableCell>ops@acme.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sunrise Cafe</TableCell>
              <TableCell>Hospitality</TableCell>
              <TableCell>hello@sunrise.cafe</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default GLN;
