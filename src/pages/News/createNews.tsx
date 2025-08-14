import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { FormEvent, useState } from "react";
interface Props {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const NewsCreate = ({ label, placeholder, value = "", onChange }: Props) => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("News created successfully");
    }, 700);
  };

  return (
    <>
      <Helmet>
        <title>Create News — Admin</title>
        <meta
          name="description"
          content="Create a new user in the admin panel."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">Create News</h1>
        <p className="text-muted-foreground mt-1">Add a New user account</p>
      </header>

      <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
        <div className="grid gap-2">
          <Label htmlFor="name">Title</Label>
          <Input id="title" placeholder="Title" required />
        </div>
        <div className="grid gap-2">
          <Label>{label}</Label>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create News"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewsCreate;
