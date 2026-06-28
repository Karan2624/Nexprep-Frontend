import React, { useState } from 'react';
import { Trash2, Link2, CheckCircle2, HelpCircle, ThumbsUp, MessageSquare, Send, Check } from 'lucide-react';
import { timeAgo } from './communityUtils';
import { api } from '../../lib/axios'; 

export default function PostCard({ post, index, currentUser, onDelete, onToggleResolved, onToggleUpvote, onTagClick }) {
  const isOwn = post.authorId?._id === currentUser?._id;
  const hasUpvoted = post.upvotedBy.includes(currentUser?._id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  
  const [localReplyCount, setLocalReplyCount] = useState(post.replyCount || 0);


  const handleToggleComments = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
      await fetchComments();
    } else {
      setIsExpanded(false);
    }
  };

  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const res = await api.get(`/community-comment/${post._id}/get-comment`);
      setComments(res.data.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const tempInput = commentInput.trim();
    setCommentInput(''); 

    try {
      const res = await api.post(`/community-comment/${post._id}/add-comment`, { 
        content: tempInput 
      });
      setComments([...comments, res.data.data]);
      setLocalReplyCount(prev => prev + 1);
    } catch (error) {
      console.error("Failed to add comment", error);
      setCommentInput(tempInput); 
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/community-comment/delete/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
      setLocalReplyCount(prev => prev - 1);
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleToggleAccept = async (commentId) => {
    try {
      await api.patch(`/community-comment/toggle-accept/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("Failed to accept comment", error);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm mb-6 animate-slide-up transition-all duration-300" style={{ animationDelay: `${100 + (index * 50)}ms`, animationFillMode: 'forwards' }}>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={post.authorId?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'} alt={post.authorId?.name} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 shadow-sm" />
          <div>
            <span className="font-extrabold text-slate-900 text-[15px] flex items-center gap-2">
              {post.authorId?.name} 
              {isOwn && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">You</span>}
            </span>
            <span className="text-[12px] text-slate-500 font-medium">{timeAgo(post.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {isOwn && (
            <>
              <button onClick={() => onDelete(post._id)} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors" title="Delete Post">
                <Trash2 size={16} />
              </button>
              <button onClick={() => onToggleResolved(post._id)} className="text-blue-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-blue-50 rounded-lg transition-all">
                <Link2 size={14}/> {post.isResolved ? 'Mark Unresolved' : 'Mark Resolved'}
              </button>
            </>
          )}
          {post.isResolved ? (
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-emerald-200/80 flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={14} strokeWidth={3} /> RESOLVED
            </span>
          ) : (
            <span className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <HelpCircle size={14} strokeWidth={2.5} /> UNRESOLVED
            </span>
          )}
        </div>
      </div>
      <h3 className="text-[19px] font-bold text-slate-900 mb-2.5">
        {post.title}
      </h3>
      <p className="text-slate-600 text-[15px] mb-6 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              onClick={() => onTagClick(`#${tag}`)}
              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[13px] font-semibold hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <button 
            onClick={() => onToggleUpvote(post._id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all transform active:scale-95 ${
              hasUpvoted ? 'bg-blue-50 text-blue-600 border border-transparent' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp size={16} className={hasUpvoted ? 'fill-current' : ''} /> {post.upvotedBy.length}
          </button>
          
          <button 
            onClick={handleToggleComments}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all transform active:scale-95 border ${
              isExpanded ? 'bg-slate-50 text-blue-600 border-transparent shadow-inner' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <MessageSquare size={16} className={isExpanded ? 'fill-current' : ''} /> {localReplyCount} Replies
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-300">

          <form onSubmit={handleAddComment} className="flex gap-3 mb-8 relative items-start">
            <img src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'} alt="You" className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a reply..."
                className="w-full pl-4 pr-12 py-2 bg-slate-100/70 border border-transparent rounded-full text-[14.5px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-500"
              />
              <button 
                type="submit" 
                disabled={!commentInput.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Send size={14} className="-ml-0.5 mt-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </form>

          {isLoadingComments && (
            <div className="text-center text-slate-400 text-sm py-4 animate-pulse font-medium">Loading replies...</div>
          )}

          <div className="flex flex-col">
            {!isLoadingComments && comments.length === 0 && (
              <div className="text-center py-4 flex flex-col items-center justify-center">
                <MessageSquare size={24} className="text-slate-200 mb-2" strokeWidth={1.5} />
                <p className="text-slate-500 text-[14px] font-medium">No replies yet. Start the conversation!</p>
              </div>
            )}

            {comments.map((comment) => {
              const isCommentOwn = comment.authorId?._id === currentUser?._id;
              
              return (
                <div 
                  key={comment._id} 
                  className={`group relative flex gap-3.5 py-4 border-b border-slate-100 last:border-0 transition-colors ${
                    comment.isAccepted 
                      ? 'bg-emerald-50/40 -mx-5 px-5 sm:-mx-6 sm:px-6 border-l-[3px] border-l-emerald-500' 
                      : ''
                  }`}
                >
                  <img src={comment.authorId?.avatar} alt={comment.authorId?.name} className="w-9 h-9 rounded-full shrink-0" />
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 text-[13px]">
                        <span className="font-bold text-slate-900">{comment.authorId?.name}</span>
                        {post.authorId?._id === comment.authorId?._id && (
                          <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">Author</span>
                        )}
                        <span className="text-slate-400 font-medium px-1">•</span>
                        <span className="text-slate-400 font-medium">{timeAgo(comment.createdAt)}</span>
                      </div>
                      
                      {isCommentOwn && (
                        <button onClick={() => handleDeleteComment(comment._id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-slate-700 text-[14.5px] leading-relaxed mb-3 pr-4">
                      {comment.content}
                    </p>

                    <div className="flex items-center gap-4">
                      {comment.isAccepted && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-600 tracking-wide">
                          <CheckCircle2 size={14} strokeWidth={2.5} /> ACCEPTED ANSWER
                        </span>
                      )}

                      {isOwn && (
                        <button 
                          onClick={() => handleToggleAccept(comment._id)}
                          className={`text-[12px] font-bold flex items-center gap-1.5 transition-colors ${
                            comment.isAccepted 
                              ? 'text-slate-400 hover:text-slate-600' 
                              : 'text-blue-500 hover:text-blue-700'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} /> 
                          {comment.isAccepted ? 'Un-accept' : 'Mark as Answer'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}