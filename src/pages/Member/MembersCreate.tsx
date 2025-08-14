import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FormEvent, useState } from "react";

const MembersCreate = () => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Merchant created successfully");
    }, 700);
  };

  return (
    <>
      <Helmet>
        <title>Create Member — Admin</title>
        <meta name="description" content="Create a new merchant account." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">Create Members</h1>
        <p className="text-muted-foreground mt-1">Onboard a new Members</p>
      </header>

      <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
        <div className="grid gap-2">
          <Label htmlFor="name">Member name</Label>
          <Input id="name" placeholder="Acme Corp" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Contact email</Label>
          <Input id="email" type="email" placeholder="ops@acme.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Merchant"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MembersCreate;
