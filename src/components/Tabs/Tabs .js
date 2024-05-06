import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import MovieSearch from '../CardList/CardList'
// import RatedMovies from './RatedMovies'; // Create a new RatedMovies component




const MyTabs = () => {
    const { TabPane } = Tabs;

    const [guestSessionId, setGuestSessionId] = useState('')

const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';
useEffect(() => {
    const createGuestSession = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setGuestSessionId(data.guest_session_id);
          console.log(data.guest_session_id)
        } else {
          console.error('Failed to create guest session');
        }
      } catch (error) {
        console.error('Error creating guest session:', error);
      }
    };

    createGuestSession();
}, []);
    const [activeTab, setActiveTab] = useState('search');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Search" key="search">
                    {/* Render Search component when 'Search' tab is active */}
                    <MovieSearch />
                </TabPane>
                <TabPane tab="Rated" key="rated">
                    {/* Render Rated component when 'Rated' tab is active */}
                    {/* <RatedMovies /> */}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default MyTabs;