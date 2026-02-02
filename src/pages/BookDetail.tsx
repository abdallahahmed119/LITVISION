import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getBookById } from "@/lib/books";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Bookmark,
  Share2,
  Download,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = getBookById(id || "");

  if (!book) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Book Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The book you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/home")}>Go Back Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBookmark = () => {
    toast.success("Book added to your library!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
                <button className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors">
                  <ChevronUp className="w-5 h-5 text-foreground" />
                </button>
                <button className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors">
                  <ChevronDown className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - Book Info */}
          <div className="animate-slide-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {book.title}
            </h1>
            <p className="text-xl font-medium text-foreground mb-4">
              {book.author}
            </p>
            <p className="text-muted-foreground italic mb-8 text-lg">
              {book.description.slice(0, 100)}...
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-10">
              <Button size="xl" variant="accent" className="gap-2">
                Start reading
                <span className="text-lg">↗</span>
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate(`/summary/${book.id}`)}
                className="gap-2"
              >
                Summary
                <Star className="w-4 h-4" />
              </Button>

              <button
                onClick={handleBookmark}
                className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button className="p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Language</h4>
                  <p className="text-muted-foreground">{book.language}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Pages</h4>
                  <p className="text-muted-foreground">{book.pages} pages</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">ISBN</h4>
                  <p className="text-muted-foreground">{book.isbn}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Reader Reviews
              </h3>
              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {review.userName}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber text-amber"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
