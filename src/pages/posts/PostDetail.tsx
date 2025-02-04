import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  updateDate?: string;
  createDate?: string;
}

function PostDetail({ api }: { api: AxiosInstance }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/post/${id}`);
        console.log("Post data:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPostDetail();
    }
  }, [id, api]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
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
      <div className="post-detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/postlist')}
        >
          ← Back to Posts
        </button>
        <h1 className="post-title">{post.title}</h1>
      </div>

      <div className="post-detail-content">
        {post.image && (
          <>
            <div className="image-section">
              <img 
                src={post.image} 
                alt={post.title} 
                className="detail-image"
                onClick={() => setIsFullscreen(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x400';
                }}
              />
            </div>

            {isFullscreen && (
              <div 
                className="image-fullscreen"
                onClick={() => setIsFullscreen(false)}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                />
                <button 
                  className="close-fullscreen"
                  onClick={() => setIsFullscreen(false)}
                >
                  ×
                </button>
              </div>
            )}
          </>
        )}          
          <div className="content-card">
            <div className="meta-info">
              <div className="date-info">
                <i className="far fa-calendar-alt"></i>
                <span>Created: {new Date(post.createDate || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <div className="description-content">
                {post.description}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PostDetail;
