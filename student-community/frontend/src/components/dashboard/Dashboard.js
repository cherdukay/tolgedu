import React, { useState, useEffect } from 'react';
import { PostForm } from './PostForm';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postsAPI.getAllPosts();
      setPosts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const data = await postsAPI.createPost(postData);
      setPosts([data.data, ...posts]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePost = async (postData) => {
    try {
      const data = await postsAPI.updatePost(editingPost._id, postData);
      setPosts(posts.map(post => 
        post._id === editingPost._id ? data.data : post
      ));
      setEditingPost(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading"></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Student Posts</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {editingPost ? (
        <>
          <h3>Edit Post</h3>
          <PostForm
            onSubmit={handleUpdatePost}
            initialData={editingPost}
            buttonText="Update Post"
          />
          <button 
            className="btn btn-danger" 
            onClick={() => setEditingPost(null)}
          >
            Cancel Edit
          </button>
        </>
      ) : (
        <PostForm onSubmit={handleCreatePost} />
      )}

      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <div className="post-header">
              <h3>{post.title}</h3>
              {user._id === post.author._id && (
                <div className="post-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p>{post.content}</p>
            <div className="post-meta">
              <span>By: {post.author.username}</span>
              <span> • </span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p>No posts yet. Be the first to create one!</p>
        )}
      </div>
    </div>
  );
};