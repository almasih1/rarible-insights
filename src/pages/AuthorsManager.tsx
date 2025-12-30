import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ArrowLeft, Plus, Edit, Trash2, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
}

const AuthorsManager = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  useEffect(() => {
    checkAuth();
    fetchAuthors();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .order("name");

      if (error) throw error;
      setAuthors(data || []);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setBio("");
    setAvatarUrl("");
    setTwitterUrl("");
    setInstagramUrl("");
    setYoutubeUrl("");
    setLinkedinUrl("");
    setEditingAuthor(null);
  };

  const handleOpenDialog = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setName(author.name);
      setBio(author.bio || "");
      setAvatarUrl(author.avatar_url || "");
      setTwitterUrl(author.twitter_url || "");
      setInstagramUrl(author.instagram_url || "");
      setYoutubeUrl(author.youtube_url || "");
      setLinkedinUrl(author.linkedin_url || "");
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter author name",
        variant: "destructive",
      });
      return;
    }

    try {
      const authorData = {
        name,
        bio: bio || null,
        avatar_url: avatarUrl || null,
        twitter_url: twitterUrl || null,
        instagram_url: instagramUrl || null,
        youtube_url: youtubeUrl || null,
        linkedin_url: linkedinUrl || null,
      };

      if (editingAuthor) {
        const { error } = await supabase
          .from("authors")
          .update(authorData)
          .eq("id", editingAuthor.id);

        if (error) throw error;
        toast({ title: "Success", description: "Author updated successfully" });
      } else {
        const { error } = await supabase
          .from("authors")
          .insert([authorData]);

        if (error) throw error;
        toast({ title: "Success", description: "Author created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchAuthors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const { error } = await supabase
        .from("authors")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchAuthors();
      toast({ title: "Success", description: "Author deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
              <h1 className="text-xl font-bold text-foreground">Manage Authors</h1>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Author
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingAuthor ? "Edit Author" : "Create New Author"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief bio about the author..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  <div className="border-t pt-4">
                    <Label className="text-sm font-semibold mb-3 block">Social Links</Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="twitter" className="text-xs flex items-center gap-2">
                          <Twitter className="w-3 h-3" /> Twitter
                        </Label>
                        <Input
                          id="twitter"
                          value={twitterUrl}
                          onChange={(e) => setTwitterUrl(e.target.value)}
                          placeholder="https://twitter.com/username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram" className="text-xs flex items-center gap-2">
                          <Instagram className="w-3 h-3" /> Instagram
                        </Label>
                        <Input
                          id="instagram"
                          value={instagramUrl}
                          onChange={(e) => setInstagramUrl(e.target.value)}
                          placeholder="https://instagram.com/username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="youtube" className="text-xs flex items-center gap-2">
                          <Youtube className="w-3 h-3" /> YouTube
                        </Label>
                        <Input
                          id="youtube"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          placeholder="https://youtube.com/@username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin" className="text-xs flex items-center gap-2">
                          <Linkedin className="w-3 h-3" /> LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    {editingAuthor ? "Update" : "Create"} Author
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading authors...</p>
          </div>
        ) : authors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No authors yet</p>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Create your first author
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authors.map((author) => (
              <div
                key={author.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold shrink-0">
                    {author.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{author.name}</h3>
                    {author.bio && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{author.bio}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {author.twitter_url && <Twitter className="w-3 h-3 text-muted-foreground" />}
                      {author.instagram_url && <Instagram className="w-3 h-3 text-muted-foreground" />}
                      {author.youtube_url && <Youtube className="w-3 h-3 text-muted-foreground" />}
                      {author.linkedin_url && <Linkedin className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    onClick={() => handleOpenDialog(author)}
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(author.id)}
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
        )}
      </main>
    </div>
  );
};

export default AuthorsManager;
