import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import CardList from '../CardList/CardList';
import RatedMovies from '../RatedMovies/RatedMovies';
import './MyTabs.css';

const { TabPane } = Tabs;

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [guestSessionId, setGuestSessionId] = useState('');

  const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';
  useEffect(() => {
    localStorage.setItem('sessionId', guestSessionId);
  }, [guestSessionId]);

  useEffect(() => {
    const createGuestSession = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setGuestSessionId(data.guest_session_id);
          console.log(data.guest_session_id);
          console.log();
        } else {
          console.error('Failed to create guest session');
        }
      } catch (error) {
        console.error('Error creating guest session:', error);
      }
    };

    createGuestSession();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);

    // Set the guest session ID if switching to the 'Rated' tab
    if (key === 'rated' && !guestSessionId) {
      console.error('guest session ID is not set');
    }
  };

  return (
    <div className="tabs-wrapper">
      <Tabs activeKey={activeTab} onChange={handleTabChange} className="tabs--centered" centered>
        <TabPane tab="Search" key="search">
          <CardList />
        </TabPane>
        <TabPane tab="Rated" key="rated">
          {guestSessionId ? (
            <RatedMovies key={activeTab} guestSessionId={guestSessionId} />
          ) : (
            <div>Loading...</div>
            // display a loading indicator here
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyTabs;
