import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Heading3,
  Quote,
  Undo,
  Redo,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
} from "lucide-react";
import "./editor-styles.css";

interface SEOCategory {
  id: string;
  title: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // SEO Categories
  const [seoCategories, setSeoCategories] = useState<SEOCategory[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  // Article Data
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("📝");
  const [seoCategoryId, setSeoCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [summaryPoints, setSummaryPoints] = useState<string[]>(["", "", "", ""]);
  const [status, setStatus] = useState<"draft" | "pending_review" | "published">("draft");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [slug, setSlug] = useState("");

  // Validation
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your article content here...",
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] px-4 py-3 focus:outline-none prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      // Trigger auto-save when content changes
      scheduleAutoSave();
    },
  });

  useEffect(() => {
    checkAuth();
    fetchSEOCategories();
    fetchAuthors();
    if (id) {
      fetchArticle();
    }

    // Cleanup auto-save timer
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [id]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!id && title) {
      setSlug(generateSlug(title));
    }
  }, [title, id]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (!metaTitle && title) {
      setMetaTitle(title.slice(0, 60));
    }
  }, [title]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    }
  };

  const fetchSEOCategories = async () => {
    const { data } = await supabase
      .from("seo_categories")
      .select("id, title, slug")
      .eq("is_active", true)
      .order("order_index");

    if (data) setSeoCategories(data);
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
      setSeoCategoryId(data.seo_category_id || "");
      setAuthorId(data.author_id || "");
      setStatus(data.status);
      setSlug(data.slug);
      setMetaTitle(data.meta_title || "");
      setMetaDescription(data.meta_description || "");
      setFocusKeyword(data.focus_keyword || "");

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

  const sanitizeHTML = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "class"],
      ALLOW_DATA_ATTR: false,
    });
  };

  const validateArticle = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!title.trim()) {
      errors.push({ field: "title", message: "Title is required" });
    } else if (title.length < 10) {
      errors.push({ field: "title", message: "Title should be at least 10 characters" });
    } else if (title.length > 100) {
      errors.push({ field: "title", message: "Title should be less than 100 characters" });
    }

    if (!seoCategoryId) {
      errors.push({ field: "seo_category", message: "SEO Category is required" });
    }

    const content = editor?.getHTML() || "";
    if (!content || content === "<p></p>") {
      errors.push({ field: "content", message: "Content is required" });
    } else {
      const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
      if (wordCount < 300) {
        errors.push({ field: "content", message: "Content should be at least 300 words" });
      }
    }

    if (!metaTitle) {
      errors.push({ field: "meta_title", message: "Meta Title is required for SEO" });
    } else if (metaTitle.length > 60) {
      errors.push({ field: "meta_title", message: "Meta Title should be max 60 characters" });
    }

    if (!metaDescription) {
      errors.push({ field: "meta_description", message: "Meta Description is required for SEO" });
    } else if (metaDescription.length > 160) {
      errors.push({ field: "meta_description", message: "Meta Description should be max 160 characters" });
    }

    if (!focusKeyword) {
      errors.push({ field: "focus_keyword", message: "Focus Keyword is recommended for SEO" });
    }

    // Check for at least one H2 heading
    if (!content.includes("<h2>")) {
      errors.push({ field: "content", message: "Add at least one H2 heading for better structure" });
    }

    return errors;
  };

  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds
  }, []);

  const handleAutoSave = async () => {
    if (!id || !editor) return;

    setAutoSaving(true);

    try {
      const content = sanitizeHTML(editor.getHTML());

      await supabase
        .from("articles")
        .update({
          auto_saved_content: content,
          auto_saved_at: new Date().toISOString(),
        })
        .eq("id", id);

      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save error:", error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleSave = async (saveStatus: "draft" | "pending_review" | "published") => {
    const errors = validateArticle();
    setValidationErrors(errors);

    if (saveStatus === "published" && errors.length > 0) {
      setShowChecklist(true);
      toast({
        title: "Validation Failed",
        description: `Please fix ${errors.length} error(s) before publishing`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const rawContent = editor?.getHTML() || "";
      const content = sanitizeHTML(rawContent);
      const readTime = calculateReadTime(content);
      const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 200);

      const articleData = {
        title,
        slug,
        content,
        excerpt,
        icon,
        seo_category_id: seoCategoryId,
        author_id: authorId,
        status: saveStatus,
        read_time: readTime,
        meta_title: metaTitle,
        meta_description: metaDescription,
        focus_keyword: focusKeyword,
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

      // Save summary points
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

        // Save version history
        await supabase
          .from("content_versions")
          .insert([{
            article_id: articleId,
            content,
            title,
            created_by: user.id,
          }]);
      }

      toast({
        title: "Success",
        description: `Article ${id ? "updated" : "created"} successfully`,
      });

      if (!id) {
        navigate(`/admin/articles/edit/${articleId}`);
      } else {
        setLastSaved(new Date());
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (id) {
      window.open(`/digital-nomad-relocation/${slug}`, "_blank");
    } else {
      toast({
        title: "Save First",
        description: "Please save the article as draft first to preview",
      });
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

  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
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

  const checklistItems = [
    { label: "Title (10-100 chars)", checked: title.length >= 10 && title.length <= 100 },
    { label: "SEO Category selected", checked: !!seoCategoryId },
    { label: "Content (min 300 words)", checked: (editor?.getHTML().replace(/<[^>]*>/g, "").split(/\s+/).length || 0) >= 300 },
    { label: "Meta Title (max 60 chars)", checked: metaTitle.length > 0 && metaTitle.length <= 60 },
    { label: "Meta Description (max 160 chars)", checked: metaDescription.length > 0 && metaDescription.length <= 160 },
    { label: "Focus Keyword set", checked: !!focusKeyword },
    { label: "At least one H2 heading", checked: editor?.getHTML().includes("<h2>") || false },
  ];

  const allChecked = checklistItems.every(item => item.checked);

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
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {id ? "Edit Article" : "Create New Article"}
                </h1>
                {lastSaved && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last saved: {lastSaved.toLocaleTimeString()}
                    {autoSaving && <span className="text-blue-600"> (saving...)</span>}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowChecklist(!showChecklist)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Checklist ({checklistItems.filter(i => i.checked).length}/{checklistItems.length})
              </Button>
              <Button
                onClick={handlePreview}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                onClick={() => handleSave("draft")}
                variant="outline"
                disabled={loading}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSave("published")}
                disabled={loading || !allChecked}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Article Meta */}
            <Card>
              <CardHeader>
                <CardTitle>Article Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Article title..."
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {title.length}/100 characters
                    </p>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seo_category">SEO Category *</Label>
                    <Select value={seoCategoryId} onValueChange={setSeoCategoryId}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select SEO category" />
                      </SelectTrigger>
                      <SelectContent>
                        {seoCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.title}
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

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="article-url-slug"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    rariblenomads.info/digital-nomad-relocation/{slug}
                  </p>
                </div>

                {/* Summary Points */}
                <div>
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
              </CardContent>
            </Card>

            {/* SEO Section */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your article for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title *</Label>
                  <Input
                    id="meta_title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value.slice(0, 60))}
                    placeholder="SEO title for search results"
                    className="mt-2"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description *</Label>
                  <Textarea
                    id="meta_description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                    placeholder="Brief description for search results"
                    className="mt-2"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="focus_keyword">Focus Keyword</Label>
                  <Input
                    id="focus_keyword"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="digital nomad visa"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Primary keyword you want to rank for
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Editor Toolbar */}
            <div className="bg-card border border-border rounded-t-lg p-3">
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-muted" : ""}
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-muted" : ""}
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive("underline") ? "bg-muted" : ""}
                  title="Underline"
                >
                  <UnderlineIcon className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
                  title="H1"
                >
                  <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
                  title="H2"
                >
                  <Heading2 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
                  title="H3"
                >
                  <Heading3 className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
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
                  onClick={addTable}
                  title="Add Table"
                >
                  <TableIcon className="w-4 h-4" />
                </Button>
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
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="bg-card border border-t-0 border-border rounded-b-lg">
              <EditorContent editor={editor} />
            </div>

            <p className="text-sm text-muted-foreground">
              💡 Tip: Use H2 headings to structure your content. Add images and links to make it engaging.
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pre-Publish Checklist */}
            {showChecklist && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Pre-Publish Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Checkbox
                        checked={item.checked}
                        disabled
                        className="mt-0.5"
                      />
                      <label className={`text-sm ${item.checked ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.label}
                      </label>
                    </div>
                  ))}
                  {!allChecked && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        Complete all items to publish
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Validation Errors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="text-sm text-red-700">
                        • {error.message}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Use focus keyword in title and first paragraph</p>
                <p>✅ Keep meta title under 60 characters</p>
                <p>✅ Meta description should be compelling</p>
                <p>✅ Use H2/H3 headings for structure</p>
                <p>✅ Add internal links to related articles</p>
                <p>✅ Minimum 300 words for good SEO</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleEditor;
