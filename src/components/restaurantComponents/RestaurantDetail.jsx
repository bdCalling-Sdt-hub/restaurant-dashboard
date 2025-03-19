import React from 'react';
import { Tabs, Card, Carousel } from 'antd';

import {
  StarOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  GiftOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const RestaurantDetail = () => {
 

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const restaurantImages = [
    '../../../public/restimg.png', 
    '../../../public/restimg.png', 
    '../../../public/restimg.png', 
 
   
  ];

  const cardData = [
    {
      title: 'Reviews',
      icon: <StarOutlined />,
      key: 'reviews',
      path: '/reviews', 
    },
    {
      title: 'Business Hours',
      icon: <ClockCircleOutlined />,
      key: 'hours',
      path: '/business-hours',
    },
    {
      title: 'Cuisine',
      icon: <CoffeeOutlined />,
      key: 'cuisine',
      path: '/cuisine',
    },
    {
      title: 'Party',
      icon: <GiftOutlined />,
      key: 'party',
      path: '/party',
    },
    {
      title: 'Social Media',
      icon: <GlobalOutlined />,
      key: 'social',
      path: '/social-media',
    },
    {
      title: 'Restaurant Features',
      icon: <UnorderedListOutlined />,
      key: 'features',
      path: '/restaurant-features',
    },
    {
      title: 'Restaurant Agreement',
      icon: <FileTextOutlined />,
      key: 'agreement',
      path: '/restaurant-agreement',
    },
    {
      title: 'Menu',
      icon: <MenuOutlined />,
      key: 'menu',
      path: '/menu-items',
    },
  ];

  return (
    <div>
      <div className="rounded-lg">
        <Carousel {...carouselSettings} className="mb-6">
          {restaurantImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Restaurant ${index + 1}`} className="w-[80%] mx-auto h-96 rounded-lg" />
            </div>
          ))}
        </Carousel>

        <h2 className="text-2xl font-semibold text-center mb-6">Ostuni Restaurant</h2>

        <div className="grid grid-cols-4 gap-4">
          {cardData.map((card) => (
            <Card  key={card.key} className="text-center hover:shadow-lg transition-shadow duration-300">
              <Link to={card.path} className='flex items-center gap-4 justify-center p-10' >
              <div className="text-xl">{card.icon}</div>
              <p className="font-medium !mt-3">{card.title}</p>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;