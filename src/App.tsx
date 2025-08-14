import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "@/components/layout/AppLayout";
import { HelmetProvider } from "react-helmet-async";
import Users from "@/pages/User/Users";
import UserCreate from "@/pages/User/UserCreate";
import Members from "@/pages/Member/Members";
import MembersCreate from "@/pages/Member/MembersCreate";
import GTIN from "@/pages/GTIN/GTIN";
import GLN from "@/pages/GLN/GLN";
import GS1 from "@/pages/GS1/GS1-128";
import News from "@/pages/News/news";
import CreateNews from "@/pages/News/createNews";
import Login from "@/pages/Login";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/create" element={<UserCreate />} />
              <Route path="/member" element={<Members />} />
              <Route path="/member/create" element={<MembersCreate />} />
              <Route path="/gtin" element={<GTIN />} />
              <Route path="/gln" element={<GLN />} />
              <Route path="/gs1-128" element={<GS1 />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/create" element={<CreateNews />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
