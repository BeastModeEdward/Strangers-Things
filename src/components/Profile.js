import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const username = localStorage.getItem('username');
  const myData = async () => {
    const API_URL =
      'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      console.log(result.data);
      setProfileData(result.data);
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    myData();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome {username}</h1>
      <h1 style={{ textAlign: 'center' }}>Messages to me:</h1>
      {profileData?.messages?.map((item) => {
        if (item.fromUser.username !== profileData.username) {
          return (
            <div className="messageBox">
              <h3>From: {item.fromUser.username}</h3>
              <p>{item.content}</p>
              <p>Post: {item.post.title}</p>
            </div>
          );
        }
      })}
      <h1 style={{ textAlign: 'center' }}>Messages from me:</h1>
      {profileData?.messages?.map((item) => {
        if (item.fromUser.username === profileData.username) {
          return (
            <div className="messageBox">
              <h3>From: {item.fromUser.username}</h3>
              <p>{item.content}</p>
              <p>Post: {item.post.title}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Profile;
