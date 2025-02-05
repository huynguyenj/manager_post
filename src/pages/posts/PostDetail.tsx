import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  createDate?: string;
  updateDate?: string;
  likes?: number;  
  comments?: Comment[];  
  userId: string;  // Thêm userId vào interface
}

function PostDetail({ api }: { api: AxiosInstance }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/post/${postId}`);
      if (response.data) {
        console.log('Fetched post data:', response.data);
        setPost(response.data);
      } else {
        console.error('No data received');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Sửa endpoint để phù hợp với MockAPI
      const response = await api.get(`/user/${userId}`);
      if (response.data) {
        console.log('User data:', response.data);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Sửa endpoint để phù hợp với MockAPI
      const response = await api.get('/user');
      console.log('All users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Cải thiện hàm getUserName để log chi tiết hơn
  const getUserName = (userId: string) => {
    console.log('Current users:', users);
    console.log('Looking for userId:', userId);
    const foundUser = users.find(user => user.id === userId);
    console.log('Found user:', foundUser);
    return foundUser?.name || 'Loading...';
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
    return () => {
      setPost(null);
      setLoading(true);
    };
  }, [id, api]);

  useEffect(() => {
    if (post?.userId) {
      fetchUserData(post.userId);
    }
  }, [post?.userId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setPost(prev => prev ? {
      ...prev,
      likes: (prev.likes || 0) + (liked ? -1 : 1)
    } : null);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      text: newComment,
      author: 'User',
      createdAt: new Date().toISOString()
    };

    setPost(prev => prev ? {
      ...prev,
      comments: [...(prev.comments || []), newCommentObj]
    } : null);
    
    setNewComment('');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading post data...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <button 
          className="back-button"
          onClick={() => navigate('/postlist')}
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <div className="header-top">
          <button className="back-button" onClick={() => navigate('/postlist')}>
            <i className="fas fa-arrow-left"></i> Back to Posts
          </button>
          <div className="logo">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" 
              alt="React Logo" 
              className="logo-image" 
            />
          </div>
        </div>
      </div>

      <div className="post-main">
        <div className="user-info-section">
          <div className="user-avatar">
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}`} 
              alt="User Avatar" 
            />
          </div>
          <div className="user-details">
            <span className="user-name">
              {user?.name || getUserName(post?.userId || '') || 'Loading...'}
            </span>
            <span className="post-date">
              Posted on: {new Date(post?.createDate || '').toLocaleString()}
            </span>
          </div>
        </div>
        <h1 className="post-title">{post?.title}</h1>

        {post?.image && (
          <div className="image-wrapper">
            <div className="image-container">
              <img 
                src={post.image} 
                alt={post.title} 
                className="detail-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x400';
                }}
              />
            </div>
          </div>
        )}

        <div className="content-wrapper">
          <div className="metadata-section">
            <div className="metadata-item">
              <i className="far fa-calendar"></i>
              <span>Created: {new Date(post?.createDate || '').toLocaleDateString()}</span>
            </div>
            {post?.updateDate && (
              <div className="metadata-item">
                <i className="far fa-clock"></i>
                <span>Updated: {new Date(post.updateDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="description-box">
            <h2 className="section-title">Description</h2>
            <div className="description-content">
              {post?.description}
            </div>
          </div>
        </div>

        <div className="engagement-section">
          <button 
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <i className={`fas fa-heart ${liked ? 'liked' : ''}`}></i>
            <span>{post.likes || 0} Likes</span>
          </button>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>

          <div className="comments-list">
            {post.comments?.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span>{comment.author}</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
