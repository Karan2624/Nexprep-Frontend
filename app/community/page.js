"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { io } from 'socket.io-client'; 

import { api } from '../../lib/axios'; 
import { useAuthStore } from '../../store/useAuthStore';
import { getGroupUI } from '../../components/community/communityUtils';

import CreatePostModal from '../../components/community/CreatePostModal';
import ForumFeed from '../../components/community/ForumFeed';
import GroupChat from '../../components/community/GroupChat';
import CommunitySidebar from '../../components/community/CommunitySidebar';

export default function CommunityPage() {
  const { user: currentUser } = useAuthStore(); 
  
  const [posts, setPosts] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [groupChats, setGroupChats] = useState({});
  const [activeGroup, setActiveGroup] = useState(null);

  const [socket, setSocket] = useState(null); 
  
  const [communityTab, setCommunityTab] = useState('All Discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
  
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket"]
    });

    newSocket.on("connect", () => {
      console.log("✅ SOCKET CONNECTED TO BACKEND! ID:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ SOCKET CONNECTION REJECTED:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("connect");
      newSocket.off("connect_error");
      newSocket.disconnect();
    };
  }, []);

  // ==========================================
  // SOCKET.IO: JOIN/LEAVE ROOMS
  // ==========================================
  useEffect(() => {
    if (socket && activeGroup) {
      // Tell backend we entered the specific group room
      socket.emit("joinGroup", activeGroup._id);

      // Clean up: Leave the room if we close the chat or switch to another group
      return () => {
        socket.emit("leaveGroup", activeGroup._id);
      };
    }
  }, [socket, activeGroup]);

  // ==========================================
  // SOCKET.IO: REAL-TIME LISTENERS
  // ==========================================
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      console.log("🔥 REAL-TIME MESSAGE RECEIVED FROM SERVER!", newMessage);
      setGroupChats((prev) => {
        const currentMessages = prev[newMessage.groupId] || [];
        
        // Prevent seeing our own message twice (since the REST API also returns it)
        if (currentMessages.some(m => m._id === newMessage._id)) return prev;

        return {
          ...prev,
          [newMessage.groupId]: [...currentMessages, newMessage]
        };
      });
    });

    socket.on("updateMessage", (updatedMsg) => {
      setGroupChats((prev) => {
        const currentMessages = prev[updatedMsg.groupId] || [];
        return {
          ...prev,
          [updatedMsg.groupId]: currentMessages.map(m => 
            m._id === updatedMsg._id ? updatedMsg : m
          )
        };
      });
    });

    socket.on("deleteMessage", (messageId) => {
      setGroupChats((prev) => {
        const nextState = { ...prev };
        for (const groupId in nextState) {
          nextState[groupId] = nextState[groupId].filter(m => m._id !== messageId);
        }
        return nextState;
      });
    });

    // Clean up listeners so they don't multiply
    return () => {
      socket.off("receiveMessage");
      socket.off("updateMessage");
      socket.off("deleteMessage");
    };
  }, [socket]);


  // ==========================================
  // STANDARD API CALLS
  // ==========================================
  useEffect(() => {
    fetchPosts();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (activeGroup) fetchGroupMessages(activeGroup._id);
  }, [activeGroup]);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/community-post/get-all-post?limit=100');
      setPosts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await api.get('/study-group/all');
      const groupsWithUI = res.data.data.map(group => ({
        ...group, ...getGroupUI(group.name), unreadCount: 0 
      }));
      setStudyGroups(groupsWithUI);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  const handleCreatePost = async (newPostData) => {
    try {
      const tagsArray = newPostData.tags.split(',').map(tag => tag.trim().replace('#', '')).filter(tag => tag !== '');
      const res = await api.post('/community-post/create-post', {
        title: newPostData.title,
        content: newPostData.content,
        tags: tagsArray
      });
      const createdPost = { ...res.data.data, upvotedBy: [], replyCount: 0 };
      
      setPosts([createdPost, ...posts]);
      setIsCreateModalOpen(false);
      setCommunityTab('My Posts'); 
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/community-post/delete-post/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleToggleResolved = async (postId) => {
    try {
      const res = await api.patch(`/community-post/resolve/${postId}`);
      setPosts(posts.map(post => post._id === postId ? { ...post, isResolved: res.data.data.isResolved } : post));
    } catch (error) {
      console.error("Failed to toggle resolve status:", error);
    }
  };

  const handleToggleUpvote = async (postId) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        const isUpvoting = !post.upvotedBy.includes(currentUser._id);
        const newUpvotedBy = isUpvoting 
          ? [...post.upvotedBy, currentUser._id] 
          : post.upvotedBy.filter(id => id !== currentUser._id);
        return { ...post, upvotedBy: newUpvotedBy };
      }
      return post;
    }));
    try { await api.patch(`/community-post/upvote/${postId}`); } 
    catch (error) { fetchPosts(); }
  };

  const handleToggleGroupMembership = async (groupId) => {
    const group = studyGroups.find(g => g._id === groupId);
    const action = group.isMember ? 'leave' : 'join';

    setStudyGroups(studyGroups.map(g => g._id === groupId ? { ...g, isMember: !g.isMember, memberCount: g.memberCount + (g.isMember ? -1 : 1) } : g));
    if (activeGroup?._id === groupId) setActiveGroup(prev => ({ ...prev, isMember: !prev.isMember, memberCount: prev.memberCount + (prev.isMember ? -1 : 1) }));

    try { await api.post(`/study-group/${action}/${groupId}`); } 
    catch (error) { fetchGroups(); }
  };

  const fetchGroupMessages = async (groupId) => {
    try {
      const res = await api.get(`/chat-message/${groupId}/message`);
    
      const sortedMessages = res.data.data.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      setGroupChats(prev => ({ 
        ...prev, 
        [groupId]: sortedMessages 
      }));
      
    } catch (error) {
      if (error.response?.status !== 403) {
         console.error("Failed to fetch messages:", error);
      }
    }
  };
  
  const handleSendGroupMessage = async (content) => {
    try {
      const res = await api.post(`/chat-message/${activeGroup._id}/send-message`, { content });
       const newMsg = res.data.data;
      setGroupChats(prev => {
        const currentMessages = prev[activeGroup._id] || [];
        if(currentMessages.some((m) => m._id===newMsg._id)){
          return prev;
        }

        return {...prev,[activeGroup._id]:[...currentMessages,newMsg]};
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading Community...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-[32px] font-bold text-slate-900 mb-2">Community Forum</h1>
          <p className="text-slate-600 text-[15px]">Discuss problems, share solutions, and get peer support.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-colors text-sm transform active:scale-95 duration-200"
        >
          <Plus size={16} strokeWidth={3} /> Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {activeGroup ? (
            <GroupChat 
              activeGroup={activeGroup} 
              setActiveGroup={setActiveGroup} 
              currentUser={currentUser} 
              groupChats={groupChats} 
              onSendMessage={handleSendGroupMessage} 
              onToggleMembership={handleToggleGroupMembership} 
            />
          ) : (
            <ForumFeed 
              posts={posts} 
              currentUser={currentUser} 
              communityTab={communityTab} 
              setCommunityTab={setCommunityTab} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onDelete={handleDeletePost} 
              onToggleResolved={handleToggleResolved} 
              onToggleUpvote={handleToggleUpvote} 
            />
          )}
        </div>

        <CommunitySidebar 
          studyGroups={studyGroups} 
          activeGroup={activeGroup} 
          setActiveGroup={setActiveGroup} 
          groupChats={groupChats} 
          onToggleMembership={handleToggleGroupMembership} 
          setSearchQuery={setSearchQuery} 
        />
      </div>

      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreatePost} 
      />
    </div>
  );
}