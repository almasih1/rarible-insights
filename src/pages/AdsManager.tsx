import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface Ad {
  id: string;
  name: string;
  icon: string;
  description: string;
  url?: string;
  position: "left" | "right";
  order_index: number;
  is_active: boolean;
  bg_color: string;
}

const bgColorOptions = [
  { value: "bg-sky-50", label: "Sky Blue" },
  { value: "bg-amber-50", label: "Amber" },
  { value: "bg-green-50", label: "Green" },
  { value: "bg-orange-50", label: "Orange" },
  { value: "bg-purple-50", label: "Purple" },
  { value: "bg-cyan-50", label: "Cyan" },
  { value: "bg-rose-50", label: "Rose" },
  { value: "bg-violet-50", label: "Violet" },
  { value: "bg-emerald-50", label: "Emerald" },
  { value: "bg-gray-100", label: "Gray" },
];

const AdsManager = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState<"left" | "right">("left");
  const [bgColor, setBgColor] = useState("bg-sky-50");

  useEffect(() => {
    checkAuth();
    fetchAds();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("position")
        .order("order_index");

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setIcon("");
    setDescription("");
    setUrl("");
    setPosition("left");
    setBgColor("bg-sky-50");
    setEditingAd(null);
  };

  const handleOpenDialog = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
      setName(ad.name);
      setIcon(ad.icon);
      setDescription(ad.description);
      setUrl(ad.url || "");
      setPosition(ad.position);
      setBgColor(ad.bg_color);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name || !icon || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const adData = {
        name,
        icon,
        description,
        url: url || null,
        position,
        bg_color: bgColor,
      };

      if (editingAd) {
        const { error } = await supabase
          .from("ads")
          .update(adData)
          .eq("id", editingAd.id);

        if (error) throw error;
        toast({ title: "Success", description: "Ad updated successfully" });
      } else {
        // Get max order_index for position
        const { data: maxOrderData } = await supabase
          .from("ads")
          .select("order_index")
          .eq("position", position)
          .order("order_index", { ascending: false })
          .limit(1);

        const maxOrder = maxOrderData?.[0]?.order_index ?? -1;

        const { error } = await supabase
          .from("ads")
          .insert([{ ...adData, order_index: maxOrder + 1 }]);

        if (error) throw error;
        toast({ title: "Success", description: "Ad created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchAds();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (ad: Ad) => {
    try {
      const { error } = await supabase
        .from("ads")
        .update({ is_active: !ad.is_active })
        .eq("id", ad.id);

      if (error) throw error;
      fetchAds();
      toast({
        title: "Success",
        description: `Ad ${!ad.is_active ? "activated" : "deactivated"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    try {
      const { error } = await supabase
        .from("ads")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchAds();
      toast({ title: "Success", description: "Ad deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const leftAds = ads.filter(ad => ad.position === "left");
  const rightAds = ads.filter(ad => ad.position === "right");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
              <h1 className="text-xl font-bold text-foreground">Manage Ads</h1>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Ad
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingAd ? "Edit Ad" : "Create New Ad"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon (Emoji) *</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="🔗"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short description..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Select value={position} onValueChange={(val) => setPosition(val as "left" | "right")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left Sidebar</SelectItem>
                        <SelectItem value="right">Right Sidebar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bgColor">Background Color *</Label>
                    <Select value={bgColor} onValueChange={setBgColor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bgColorOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    {editingAd ? "Update" : "Create"} Ad
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Sidebar Ads */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Left Sidebar ({leftAds.length})</h2>
            <div className="space-y-3">
              {leftAds.map((ad) => (
                <div
                  key={ad.id}
                  className={`border rounded-lg p-4 ${ad.is_active ? "border-border" : "border-dashed border-muted-foreground/30 opacity-50"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${ad.bg_color} flex items-center justify-center text-xl shrink-0`}>
                      {ad.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{ad.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{ad.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      onClick={() => toggleActive(ad)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      {ad.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {ad.is_active ? "Hide" : "Show"}
                    </Button>
                    <Button
                      onClick={() => handleOpenDialog(ad)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(ad.id)}
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Ads */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Right Sidebar ({rightAds.length})</h2>
            <div className="space-y-3">
              {rightAds.map((ad) => (
                <div
                  key={ad.id}
                  className={`border rounded-lg p-4 ${ad.is_active ? "border-border" : "border-dashed border-muted-foreground/30 opacity-50"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${ad.bg_color} flex items-center justify-center text-xl shrink-0`}>
                      {ad.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{ad.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{ad.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      onClick={() => toggleActive(ad)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      {ad.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {ad.is_active ? "Hide" : "Show"}
                    </Button>
                    <Button
                      onClick={() => handleOpenDialog(ad)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(ad.id)}
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdsManager;
