import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getBookById } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Headphones } from "lucide-react";

const Summary = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = getBookById(id || "");

  const handleListenSummary = () => {
    alert("🔊 Audio summary coming soon!");
  };

  if (!book) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-lg text-muted-foreground">Summary not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="font-serif text-3xl font-bold mb-2">
            {book.title} – Summary
          </h1>
          <p className="text-muted-foreground mb-6">{book.author}</p>

          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Quick overview of the book
            </span>
          </div>

          <p className="leading-relaxed text-foreground text-lg">
            {book.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => navigate(`/book/${book.id}`)}>
              Back to Book
            </Button>

            <button
              onClick={handleListenSummary}
              className="p-3 rounded-lg border border-border
                         hover:bg-muted transition"
              title="Listen to summary"
            >
              <Headphones className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Summary;
