import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Article from "./pages/Article";
import DigitalNomadHub from "./pages/DigitalNomadHub";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import EditorialPolicy from "./pages/EditorialPolicy";
import Newsletter from "./pages/Newsletter";
import RelocationChecklist from "./pages/RelocationChecklist";
import DocumentsNeeded from "./pages/DocumentsNeeded";
import DigitalNomadVisas from "./pages/DigitalNomadVisas";
import RelocationTimeline from "./pages/RelocationTimeline";
import RelocationCost from "./pages/RelocationCost";
import CountryGuides from "./pages/CountryGuides";
import NomadTaxes from "./pages/NomadTaxes";
import HealthcareInsurance from "./pages/HealthcareInsurance";
import BankingAbroad from "./pages/BankingAbroad";
import RelocationMistakes from "./pages/RelocationMistakes";
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
          
          {/* Footer Guide Pages */}
          <Route path="/digital-nomad-relocation/relocation-checklist-digital-nomads" element={<RelocationChecklist />} />
          {/* 301 Redirect from old footer URL */}
          <Route path="/digital-nomad-relocation/relocation-checklist" element={<Navigate to="/digital-nomad-relocation/relocation-checklist-digital-nomads" replace />} />
          <Route path="/digital-nomad-relocation/documents-needed" element={<DocumentsNeeded />} />
          <Route path="/digital-nomad-relocation/digital-nomad-visas" element={<DigitalNomadVisas />} />
          <Route path="/digital-nomad-relocation/relocation-timeline" element={<RelocationTimeline />} />
          <Route path="/digital-nomad-relocation/relocation-cost" element={<RelocationCost />} />
          <Route path="/digital-nomad-relocation/country-guides" element={<CountryGuides />} />
          <Route path="/digital-nomad-relocation/nomad-taxes" element={<NomadTaxes />} />
          <Route path="/digital-nomad-relocation/healthcare-insurance" element={<HealthcareInsurance />} />
          <Route path="/digital-nomad-relocation/banking-abroad" element={<BankingAbroad />} />
          <Route path="/digital-nomad-relocation/relocation-mistakes" element={<RelocationMistakes />} />
          
          {/* Base Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/newsletter" element={<Newsletter />} />
          
          {/* 301 Redirect from old URL structure */}
          <Route path="/article/:slug" element={<ArticleRedirect />} />
          
          {/* Admin Routes */}
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
