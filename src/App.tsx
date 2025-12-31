import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Article from "./pages/Article";
import DigitalNomadHub from "./pages/DigitalNomadHub";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ArticleEditor from "./pages/ArticleEditor";
import AdsManager from "./pages/AdsManager";
import CategoriesManager from "./pages/CategoriesManager";
import AuthorsManager from "./pages/AuthorsManager";
import SubscribersManager from "./pages/SubscribersManager";

const queryClient = new QueryClient();

// 301 Redirect component for old URLs
const ArticleRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/digital-nomad-relocation/${slug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/digital-nomad-relocation" element={<DigitalNomadHub />} />
          <Route path="/digital-nomad-relocation/:slug" element={<Article />} />
          
          {/* 301 Redirect from old URL structure */}
          <Route path="/article/:slug" element={<ArticleRedirect />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/articles/new" element={<ArticleEditor />} />
          <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
          <Route path="/admin/ads" element={<AdsManager />} />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/authors" element={<AuthorsManager />} />
          <Route path="/admin/subscribers" element={<SubscribersManager />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
