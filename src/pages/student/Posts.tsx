import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Posts = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "p1",
      author: "Arjun Mehta",
      avatar: "AM",
      role: "Frontend Developer",
      content: "🚀 Just completed my first React project! Excited to share my journey with frontend development. Looking forward to learning more advanced concepts like Next.js and TypeScript.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      liked: false,
    },
    {
      id: "p2",
      author: "Sneha Reddy",
      avatar: "SR",
      role: "Backend Developer",
      content: "🎉 Got my AWS Cloud Practitioner certification! The journey has been amazing. Thanks to everyone who supported me along the way. Now focusing on AWS Solutions Architect Associate.",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 8,
      liked: false,
    },
    {
      id: "p3",
      author: "Kavya Nair",
      avatar: "KN",
      role: "UI/UX Designer",
      content: "💻 Sharing my learning resources for web development. Check out my blog for tutorials on React, Node.js, GraphQL, and modern web design patterns!",
      timestamp: "1 day ago",
      likes: 58,
      comments: 12,
      liked: false,
    },
    {
      id: "p4",
      author: "Vikram Singh",
      avatar: "VS",
      role: "Embedded Systems Engineer",
      content: "⚡ Completed my IoT project with Arduino and Raspberry Pi. Building smart solutions for real-world problems. Open to collaborations!",
      timestamp: "2 days ago",
      likes: 31,
      comments: 7,
      liked: false,
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({ title: "Error", description: "Please write something before posting", variant: "destructive" });
      return;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      author: "You",
      avatar: "YOU",
      role: "Student",
      content: newPostContent,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setOpenDialog(false);
    toast({ title: "Success", description: "Post created successfully!" });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-6">
      <div className="max-w-3xl mx-auto space-y-8 pb-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/20 text-white backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Posts & Feed</h1>
        </div>
        <p className="text-white/80 ml-11 text-lg">Share your achievements, projects, and learning journey with the community</p>
      </div>

      {/* Create Post Card */}
      <Card className="shadow-lg border-0 overflow-hidden bg-white/10 backdrop-blur-md hover:shadow-xl transition-all duration-300 hover:bg-white/15">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <Avatar className="h-12 w-12 ring-2 ring-white/30">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold">YOU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Input
                      placeholder="What's on your mind?"
                      className="bg-white/20 hover:bg-white/30 cursor-pointer border-white/20 text-white placeholder:text-white/50 transition-colors text-sm"
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-purple-900/90 border-white/20">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
                        <Sparkles className="h-5 w-5 text-blue-300" />
                        Create a New Post
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Share your thoughts, achievements, or learning journey..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={6}
                        className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setOpenDialog(false)} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
                        <Button onClick={handleCreatePost} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 gap-2 hover:from-blue-600 hover:to-purple-600">
                          <Plus className="h-4 w-4" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-5">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-white/60" />
            </div>
            <p className="text-white/70 font-medium">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Card 
              key={post.id} 
              className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-white/10 backdrop-blur-sm hover:bg-white/15"
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex gap-4 items-start">
                    <Avatar className="h-12 w-12 ring-2 ring-white/30">
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold text-sm">{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <p className="font-bold text-sm text-white">{post.author}</p>
                        <span className="text-xs text-blue-200 font-medium bg-blue-500/20 px-2 py-0.5 rounded-full">{post.role}</span>
                      </div>
                      <p className="text-xs text-white/60 mt-0.5">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="bg-white/5 rounded-lg p-4 ml-16">
                    <p className="text-sm text-white leading-relaxed font-medium">{post.content}</p>
                  </div>

                  {/* Post Stats */}
                  <div className="flex gap-6 text-xs text-white/70 font-medium px-2 ml-12">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-400/70" />
                      {post.likes} {post.likes === 1 ? "like" : "likes"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-blue-400/70" />
                      {post.comments} {post.comments === 1 ? "comment" : "comments"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10 mx-2 ml-12" />

                  {/* Post Actions */}
                  <div className="flex gap-2 ml-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-red-500/20 hover:text-red-300 text-white/70 transition-colors group"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-2 transition-all ${post.liked ? "fill-red-400 text-red-400" : "group-hover:text-red-300"}`} />
                      {post.liked ? "Liked" : "Like"}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs hover:bg-blue-500/20 hover:text-blue-300 text-white/70 transition-colors group">
                      <MessageCircle className="h-4 w-4 mr-2 group-hover:text-blue-300" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs hover:bg-green-500/20 hover:text-green-300 text-white/70 transition-colors group">
                      <Share2 className="h-4 w-4 mr-2 group-hover:text-green-300" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default Posts;
