import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface HomepageHero {
  title: string;
  subtitle: string;
  subscriber_text: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterContent {
  columns: FooterColumn[];
  copyright: string;
}

const SiteSettingsManager = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Homepage Hero
  const [homepageHero, setHomepageHero] = useState<HomepageHero>({
    title: "",
    subtitle: "",
    subscriber_text: "",
  });

  // Footer
  const [footerContent, setFooterContent] = useState<FooterContent>({
    columns: [],
    copyright: "",
  });

  useEffect(() => {
    checkAuth();
    fetchSettings();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchSettings = async () => {
    try {
      // Fetch homepage hero
      const { data: heroData, error: heroError } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "homepage_hero")
        .single();

      if (heroError) throw heroError;
      if (heroData) setHomepageHero(heroData.value as HomepageHero);

      // Fetch footer content
      const { data: footerData, error: footerError } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "footer_content")
        .single();

      if (footerError) throw footerError;
      if (footerData) setFooterContent(footerData.value as FooterContent);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveHomepageHero = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: homepageHero })
        .eq("key", "homepage_hero");

      if (error) throw error;

      toast({
        title: "Success",
        description: "Homepage settings saved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const saveFooterContent = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: footerContent })
        .eq("key", "footer_content");

      if (error) throw error;

      toast({
        title: "Success",
        description: "Footer settings saved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addFooterColumn = () => {
    setFooterContent({
      ...footerContent,
      columns: [...footerContent.columns, { title: "", links: [] }],
    });
  };

  const removeFooterColumn = (index: number) => {
    const newColumns = footerContent.columns.filter((_, i) => i !== index);
    setFooterContent({ ...footerContent, columns: newColumns });
  };

  const updateFooterColumn = (index: number, field: string, value: string) => {
    const newColumns = [...footerContent.columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setFooterContent({ ...footerContent, columns: newColumns });
  };

  const addFooterLink = (columnIndex: number) => {
    const newColumns = [...footerContent.columns];
    newColumns[columnIndex].links.push({ text: "", url: "" });
    setFooterContent({ ...footerContent, columns: newColumns });
  };

  const removeFooterLink = (columnIndex: number, linkIndex: number) => {
    const newColumns = [...footerContent.columns];
    newColumns[columnIndex].links = newColumns[columnIndex].links.filter(
      (_, i) => i !== linkIndex
    );
    setFooterContent({ ...footerContent, columns: newColumns });
  };

  const updateFooterLink = (
    columnIndex: number,
    linkIndex: number,
    field: string,
    value: string
  ) => {
    const newColumns = [...footerContent.columns];
    newColumns[columnIndex].links[linkIndex] = {
      ...newColumns[columnIndex].links[linkIndex],
      [field]: value,
    };
    setFooterContent({ ...footerContent, columns: newColumns });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <h1 className="text-lg font-semibold text-foreground">
                Site Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="homepage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          {/* Homepage Tab */}
          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Hero Section</CardTitle>
                <CardDescription>
                  Edit the main text on the homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Main Title</Label>
                  <Input
                    id="title"
                    value={homepageHero.title}
                    onChange={(e) =>
                      setHomepageHero({ ...homepageHero, title: e.target.value })
                    }
                    placeholder="Rarible Nomads"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={homepageHero.subtitle}
                    onChange={(e) =>
                      setHomepageHero({ ...homepageHero, subtitle: e.target.value })
                    }
                    placeholder="Independent insights on digital nomad relocation..."
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="subscriber_text">Subscriber Text</Label>
                  <Input
                    id="subscriber_text"
                    value={homepageHero.subscriber_text}
                    onChange={(e) =>
                      setHomepageHero({
                        ...homepageHero,
                        subscriber_text: e.target.value,
                      })
                    }
                    placeholder="Join {count} readers."
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use {"{count}"} where the subscriber count should appear
                  </p>
                </div>

                <Button onClick={saveHomepageHero} disabled={saving}>
                  {saving ? "Saving..." : "Save Homepage Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Footer Columns</CardTitle>
                <CardDescription>
                  Manage footer links and columns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {footerContent.columns.map((column, columnIndex) => (
                  <Card key={columnIndex}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Column {columnIndex + 1}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFooterColumn(columnIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Column Title</Label>
                        <Input
                          value={column.title}
                          onChange={(e) =>
                            updateFooterColumn(columnIndex, "title", e.target.value)
                          }
                          placeholder="e.g., Content"
                          className="mt-2"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Links</Label>
                        {column.links.map((link, linkIndex) => (
                          <div key={linkIndex} className="flex gap-2">
                            <Input
                              value={link.text}
                              onChange={(e) =>
                                updateFooterLink(
                                  columnIndex,
                                  linkIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                              placeholder="Link text"
                            />
                            <Input
                              value={link.url}
                              onChange={(e) =>
                                updateFooterLink(
                                  columnIndex,
                                  linkIndex,
                                  "url",
                                  e.target.value
                                )
                              }
                              placeholder="/page-url"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFooterLink(columnIndex, linkIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addFooterLink(columnIndex)}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  onClick={addFooterColumn}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Column
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Copyright Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={footerContent.copyright}
                  onChange={(e) =>
                    setFooterContent({ ...footerContent, copyright: e.target.value })
                  }
                  placeholder="© 2026 Rarible Nomads. All rights reserved."
                />
              </CardContent>
            </Card>

            <Button onClick={saveFooterContent} disabled={saving}>
              {saving ? "Saving..." : "Save Footer Settings"}
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SiteSettingsManager;
