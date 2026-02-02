import { useState } from "react";
import Layout from "@/components/Layout";
import BookCard from "@/components/BookCard";
import { books, categories, getBooksByCategory } from "@/lib/books";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth";
import libraryBg from "@/assets/library-bg.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();

  const filteredBooks = getBooksByCategory(selectedCategory).filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-secondary/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search book name, author, edition..."
              className="pl-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="hidden sm:block font-medium text-foreground">
                {user?.name || "User"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
          <img
            src={libraryBg}
            alt="Library"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-slide-up">
              Welcome back, {user?.name?.split(" ")[0] || "Reader"}!
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Discover your next great read from our collection of captivating stories.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Books Grid */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            {selectedCategory === "all" ? "All Books" : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No books found matching your search.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
