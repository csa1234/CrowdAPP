import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [showTerms, setShowTerms] = useState(true); // State to control the visibility of terms and conditions

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  // Function to handle accepting the terms and conditions
  const handleAcceptTerms = () => {
    setShowTerms(false);
    // Save the acceptance status in local storage to prevent further pop-ups
    localStorage.setItem('termsAccepted', 'true');
  };

  useEffect(() => {
    // Check if the terms have already been accepted
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (termsAccepted === 'true') {
      setShowTerms(false);
    }
  }, []);

  return (
    <div>
      {/* Display the campaigns */}
      <DisplayCampaigns title="All Campaigns" isLoading={isLoading} campaigns={campaigns} />

      {/* Modal for terms and conditions */}
      {showTerms && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 20,
              borderRadius: 5,
            }}
          >
            <h2>Terms and Conditions</h2>
            <p>
              By using this platform, you agree to the following terms and conditions:
            </p>
            <ul style={{ listStyleType: 'disc' }}>
              <li>Posting adult content, violence, harassment, or any illegal content is strictly prohibited.</li>
              <li>Users who violate these rules will have their wallet address banned, and their campaign will be removed.</li>
              <li>Users from the United States of America (USA) and Canada are prohibited from using this platform.</li>
            </ul>
            <button
              onClick={handleAcceptTerms}
              style={{
                backgroundColor: '#ff00ff',
                color: 'white',
                padding: '10px 20px',
                borderRadius: 5,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
