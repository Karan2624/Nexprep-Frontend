import React from 'react';
import { Search, X, MessageSquare } from 'lucide-react';
import PostCard from './PostCard';

export default function ForumFeed({ 
  posts, currentUser, communityTab, setCommunityTab, 
  searchQuery, setSearchQuery, onDelete, onToggleResolved, onToggleUpvote 
}) {
  
  const filteredPosts = posts.filter(post => {
    const isOwn = post.authorId?._id === currentUser?._id;

    if (communityTab === 'Resolved' && !post.isResolved) return false;
    if (communityTab === 'Unresolved' && post.isResolved) return false;
    if (communityTab === 'My Posts' && !isOwn) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(query);
      const inContent = post.content.toLowerCase().includes(query);
      const inTags = post.tags.some(tag => tag.toLowerCase().includes(query.replace('#', '')));
      if (!inTitle && !inContent && !inTags) return false;
    }
    return true;
  });

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6 animate-slide-up delay-100 " style={{ animationFillMode: 'forwards' }}>
        <div className="flex gap-6 border-b border-slate-100 mb-6 overflow-x-auto">
          {['All Discussions', 'Resolved', 'Unresolved', 'My Posts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setCommunityTab(tab)}
              className={`pb-3 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors ${
                communityTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions (e.g. tags: #...)" 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow" 
            />
            {searchQuery && (
               <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                 <X size={14} />
               </button>
            )}
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
         <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 animate-slide-up delay-200 shadow-sm" style={{ animationFillMode: 'forwards' }}>
            <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" strokeWidth={1} />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No discussions found</h3>
            <p className="text-sm">Try adjusting your filters or search query.</p>
         </div>
      ) : (
        filteredPosts.map((post, index) => (
          <PostCard 
            key={post._id}
            post={post}
            index={index}
            currentUser={currentUser}
            onDelete={onDelete}
            onToggleResolved={onToggleResolved}
            onToggleUpvote={onToggleUpvote}
            onTagClick={setSearchQuery}
          />
        ))
      )}
    </>
  );
}