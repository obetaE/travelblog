"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [ addComment, setAddComment ] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/interaction?postId=${postId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");

        const data = await response.json();
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddComment(true)

    if (!name.trim() || !newComment.trim()) {
      setError("Please fill in both name and comment fields");
      return;
    }

    try {
      const response = await fetch("/api/interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          user: name,
          text: newComment,
          tag: "Comments",
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const data = await response.json();
      setComments(data.comments);
      setNewComment("");
      setName("");
      setError("");
      setAddComment(false);
    } catch (err) {
      setError("Failed to post comment: " + err.message);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading comments...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 w-full"
          />
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={addComment}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition self-end"
          >
            { addComment ? "Posting Comment" : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-emerald-600">Anonymous</span>
              <span className="text-sm text-gray-500">--/--/----</span>
            </div>
            <p className="text-gray-700">No Comments Yet</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-emerald-600">
                  {comment.user}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
