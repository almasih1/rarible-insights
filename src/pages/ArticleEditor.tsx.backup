import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Link2,
  Save,
  ArrowLeft,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import "./editor-styles.css";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

interface Author {
  id: string;
  name: string;
}

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("📝");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [summaryPoints, setSummaryPoints] = useState<string[]>(["", "", "", ""]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your article content here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] px-4 py-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    checkAuth();
    fetchCategories();
    fetchAuthors();
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    
    if (data) setCategories(data);
  };

  const fetchAuthors = async () => {
    const { data } = await supabase
      .from("authors")
      .select("id, name")
      .order("name");
    
    if (data) {
      setAuthors(data);
      if (data.length > 0 && !authorId) {
        setAuthorId(data[0].id);
      }
    }
  };

  const fetchArticle = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          summary_points:article_summary_points(point_text, order_index)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setIcon(data.icon);
      setCategoryId(data.category_id);
      setAuthorId(data.author_id || "");
      
      if (editor && data.content) {
        editor.commands.setContent(data.content);
      }

      if (data.summary_points) {
        const points = data.summary_points
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((p: any) => p.point_text);
        setSummaryPoints([...points, "", "", "", ""].slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSave = async (saveStatus: "draft" | "published") => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }

    if (!categoryId) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }

    const content = editor?.getHTML() || "";
    if (!content || content === "<p></p>") {
      toast({
        title: "Error",
        description: "Please write some content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const slug = generateSlug(title);
      const readTime = calculateReadTime(content);
      const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 200);

      const articleData = {
        title,
        slug,
        content,
        excerpt,
        icon,
        category_id: categoryId,
        author_id: authorId,
        status: saveStatus,
        read_time: readTime,
        published_at: saveStatus === "published" ? new Date().toISOString() : null,
      };

      let articleId = id;

      if (id) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data: newArticle, error } = await supabase
          .from("articles")
          .insert([articleData])
          .select()
          .single();

        if (error) throw error;
        articleId = newArticle.id;
      }

      if (articleId) {
        await supabase
          .from("article_summary_points")
          .delete()
          .eq("article_id", articleId);

        const validPoints = summaryPoints.filter(p => p.trim());
        if (validPoints.length > 0) {
          const points = validPoints.map((point, index) => ({
            article_id: articleId,
            point_text: point,
            order_index: index,
          }));

          await supabase
            .from("article_summary_points")
            .insert(points);
        }
      }

      toast({
        title: "Success",
        description: `Article ${id ? "updated" : "created"} successfully`,
      });

      if (!id) {
        navigate(`/admin/articles/edit/${articleId}`);
      }
    } catch (error: any) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const updateSummaryPoint = (index: number, value: string) => {
    const newPoints = [...summaryPoints];
    newPoints[index] = value;
    setSummaryPoints(newPoints);
  };

  if (!editor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading editor...</p>
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
                {id ? "Edit Article" : "Create New Article"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleSave("draft")}
                variant="outline"
                disabled={loading}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSave("published")}
                disabled={loading}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Meta */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="📝"
                className="mt-2"
                maxLength={2}
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Select value={authorId} onValueChange={setAuthorId}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Points */}
          <div className="mt-6">
            <Label>Summary Points (What's in this article)</Label>
            <div className="space-y-2 mt-2">
              {summaryPoints.map((point, index) => (
                <Input
                  key={index}
                  value={point}
                  onChange={(e) => updateSummaryPoint(index, e.target.value)}
                  placeholder={`Point ${index + 1}...`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="bg-card border border-border rounded-t-lg p-3">
          <div className="flex flex-wrap items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-muted" : ""}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-muted" : ""}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
              title="Heading 1 (Large)"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
              title="Heading 2 (Medium)"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "bg-muted" : ""}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "bg-muted" : ""}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "bg-muted" : ""}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addImage}
              title="Add Image"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addLink}
              className={editor.isActive("link") ? "bg-muted" : ""}
              title="Add Link"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="bg-card border border-t-0 border-border rounded-b-lg">
          <EditorContent editor={editor} />
        </div>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground mt-4">
          Tip: Use the toolbar to format your text. You can add headings, lists, quotes, images, and links.
        </p>
      </main>
    </div>
  );
};

export default ArticleEditor;
