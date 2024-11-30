import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { XStack, YStack, Button, Anchor } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '@clerk/clerk-expo';

const DevHome = () => {
  const { dev } = useLocalSearchParams<{ dev: string }>();
  const { user } = useUser();
  const metadata = user?.unsafeMetadata || {};

  return (
    <View style={styles.container}>
      <XStack
        flex={1}
        gap="$4"
        justifyContent="center"
        alignItems="center"
        $gtSm={{ flexDirection: 'row' }}
        $sm={{ flexDirection: 'column' }}
      >
        {/* Right Column (Profile Image and Social Links) */}
        <YStack
          flex={0.4}
          style={styles.rightColumn}
          bg="rgba(255, 255, 255, 0.8)"
          padding="$4"
          alignItems="center"
          justifyContent="center"
          $sm={{ flex: 1 }}
        >
          {/* Profile Image */}
          <Image
            source={{ uri: metadata.profilePhotoUrl || 'https://cdn.dribbble.com/userupload/5859589/file/original-55534b3895c5e6fee63696b7418eade7.png?resize=752x' }}
            style={styles.profileImage}
          />

          {/* Full Name */}
          <Text style={styles.fullName}>{metadata.userProfile?.name || user?.fullName || 'Developer Name'}</Text>

          {/* Social Media Links */}
          <Text style={styles.subheading}>Find me on</Text>
          <XStack space="$3" marginTop="$2">
            <Anchor href={metadata.contact?.github || "https://github.com"} target="_blank">
              <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/25/25231.png' }} style={styles.icon} />
            </Anchor>
            <Anchor href={metadata.contact?.linkedIn || "https://linkedin.com"} target="_blank">
              <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/61/61109.png' }} style={styles.icon} />
            </Anchor>
            <Anchor href={metadata.contact?.twitter || "https://twitter.com"} target="_blank">
              <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/733/733579.png' }} style={styles.icon} />
            </Anchor>
          </XStack>
        </YStack>

        {/* Left Column (Description and Contact Info) */}
        <YStack
          flex={0.6}
          style={styles.leftColumn}
          bg="rgba(255, 255, 255, 0.8)"
          padding="$4"
          justifyContent="center"
          $sm={{ flex: 1 }}
        >
          <Text style={styles.title}>Hi, I'm {dev || metadata.userProfile?.name}</Text>
          <Text style={styles.description}>
            {metadata.userProfile?.bio || "I'm a passionate developer specializing in web3 and mobile app development. I love building seamless, high-performance applications with cutting-edge technologies."}
          </Text>

          <Text style={styles.subheading}>Contact Me</Text>
          <Text>Email: {metadata.contact?.email || user?.emailAddresses[0]?.emailAddress || 'developer@example.com'}</Text>
          <Text>Location: {metadata.location || 'Unknown Location'}</Text>

          {/* Action Buttons */}
          <XStack space="$3" marginTop="$4" alignItems="center">
            <Button onPress={() => alert('Liked!')} theme="red" size="$4" icon={<Icon name="heart" size={20} color="#fff" />}>
              Like
            </Button>
            <Button onPress={() => alert('Followed!')} theme="green" size="$4" icon={<Icon name="user-plus" size={20} color="#fff" />}>
              Follow
            </Button>
            <Anchor href={metadata.projects?.[0]?.link || "https://yourportfolio.com"} target="_blank">
              <Button theme="blue" size="$4" icon={<Icon name="link" size={20} color="#fff" />}>
                Portfolio
              </Button>
            </Anchor>
            <Anchor href="https://github.com/yourusername" target="_blank">
              <Button theme="purple" size="$4" icon={<Icon name="github" size={20} color="#fff" />}>
                GitHub
              </Button>
            </Anchor>
            <Button theme="yellow" size="$4" onPress={() => alert('Tipped!')} icon={<Icon name="money" size={20} color="#fff" />}>
              Tip
            </Button>
          </XStack>
        </YStack>
      </XStack>
    </View>
  );
};

export default DevHome;

// Custom Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  leftColumn: {
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
  },
  rightColumn: {
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  fullName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
