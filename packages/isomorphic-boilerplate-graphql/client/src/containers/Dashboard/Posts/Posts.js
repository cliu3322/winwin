import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import {
  FiHeart,
  FiShare,
  FiBookmark,
  FiMessageCircle,
  FiMoreHorizontal,
} from 'react-icons/fi';
import GlideCarousel, { GlideSlide } from '@iso/ui/GlideCarousel/GlideCarousel';
import Modal from '@iso/ui/Antd/Modal/Modal';
import PostCard from '@iso/components/PostCard';
import AvatarCard from '@iso/components/AvatarCard/AvatarCard';
import Chart from './Chart';
import Ticket from './Ticket';
import PostsWrapper, { Button, ContentWrapper } from './Posts.styles';

const galleryOptions = {
  gap: 0,
};

const Posts = ({ data = [], avatar, username }) => {
  const [currentPost, setCurrentPost] = useState(1);
  const [visible, setVisible] = useState(false);

  const showSelectedPost = data => {
    setCurrentPost(data.id);
    setVisible(true);
  };

  const renderHtml = data => {
    return { __html: data };
  };

  const handleCancel = () => {
    setVisible(false);
  };

  let newData = {};

  data.forEach(item => {
    if (item.id === currentPost) {
      newData = item;
    }
  });
  console.log(currentPost);
  return (
    <PostsWrapper>
      {data.map(item => (
        <PostCard
          key={item.id}
          variant="instagram"
          type={item.type}
          image={item.thumb_url}
          numberOflike={item.numberOflike && item.numberOflike}
          numberOfView={item.numberOfView && item.numberOfView}
          numberOfcomment={item.numberOfcomment}
          onClick={() => showSelectedPost(item)}
        />
      ))}

      <Modal
        wrapClassName="instagram-modal"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <ContentWrapper>
          <div className="media">
            {newData.type === 'image' && (
              <img src={newData.thumb_url} alt={'post'} />
            )}

            {newData.type === 'gallery' && (
              <GlideCarousel
                options={galleryOptions}
                bullets={true}
                prevButton={<IoIosArrowDropleftCircle />}
                nextButton={<IoIosArrowDroprightCircle />}
                numberOfBullets={newData.gallery.length}
                carouselSelector={`post-gallery--${newData.id}`}
              >
                <Fragment>
                  {newData.gallery.map((item, index) => (
                    <GlideSlide key={`gallery-key${index}`}>
                      <img src={item} alt={'post'} />
                    </GlideSlide>
                  ))}
                </Fragment>
              </GlideCarousel>
            )}

            {newData.type === 'video' && (
              <div
                className="video-container"
                dangerouslySetInnerHTML={renderHtml(newData.video)}
              ></div>
            )}
            {newData.type === 'chart' && <Chart />}
          </div>

          <div className="content">
            <header className="header">
              <div className="avatar-wrapper">
                <AvatarCard avatar={avatar} username={username} />
                <span>•</span>
                <Link to="/dashboard/my-profile" rel="nofollow">
                  Follow
                </Link>
              </div>
              <button type="button">
                <FiMoreHorizontal />
              </button>
            </header>

            <div className="body">
              <Ticket />
            </div>

            <footer className="footer">
              <div className="top-bar">
                <button className="like" type="button">
                  <FiHeart />
                </button>
                <button className="comment" type="button">
                  <FiMessageCircle />
                </button>
                <button className="share" type="button">
                  <FiShare />
                </button>
                <button className="bookmark" type="button">
                  <FiBookmark />
                </button>
              </div>
              <div className="activity-info">
                <h5>{newData.numberOflike} likes</h5>
                <time>AUGUST 31</time>
              </div>
            </footer>
          </div>
        </ContentWrapper>
      </Modal>
    </PostsWrapper>
  );
};

export default Posts;
