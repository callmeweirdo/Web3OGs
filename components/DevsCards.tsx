import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// DevsProfileCards Component
export function DevsCardProfiles() {
  const [devsData, setDevsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the Clerk API using Axios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.clerk.com/v1/users', {
          headers: {
            'Authorization': 'Bearer pk_test_dG91Y2hlZC1iZWUtMjguY2xlcmsuYWNjb3VudHMuZGV2JA',  // Replace with your Clerk Bearer token
            'Content-Type': 'application/json',
          },
        });

        setDevsData(response.data);  // Assuming the data returned is an array of users
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Paragraph>Loading users...</Paragraph>;
  if (error) return <Paragraph>{error}</Paragraph>;

  return (
    <ResponsiveGrid>
      {devsData.map((dev, index) => (
        <DevsCards
          key={dev.id}  // Assuming each user has a unique `id`
          title={dev.first_name || 'Unknown'}
          description={dev.email || 'No email available'}
          imageUri={dev.profile_image_url || 'https://image.pngaaa.com/743/6496743-middle.png'}
        />
      ))}
    </ResponsiveGrid>
  );
}

// DevsCards Component
export function DevsCards({ title, description, imageUri }) {
  return (
    <Link href={{ pathname: "/[dev]/", params: { dev: title.toLowerCase() } }}>
      <Card
        elevate
        size="$4"
        bordered
        style={styles.cardContainer}
      >
        <Card.Header padded>
          <H2 text>{title}</H2>
        </Card.Header>
        <Card.Body>
          <Image source={{ uri: imageUri }} alt={title} style={{ width: 100, height: 100 }} />
          <Paragraph>{description}</Paragraph>
        </Card.Body>
      </Card>
    </Link>
  );
}

const styles = {
  cardContainer: {
    width: 200,
    margin: 10,
  },
};
