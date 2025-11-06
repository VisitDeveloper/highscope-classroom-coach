import ProfileCard from '../../components/common/profile-card'
import type { ProfileData } from '../../components/common/profile-card'

const Profile = () => {
  // Sample data - replace with actual data from API or state
  const profileData: ProfileData = {
    firstName: 'Rafiqur',
    lastName: 'Rahman',
    email: 'rafiqurrahman51@gmail.com',
    phone: '+09 345 346 46',
    bio: 'Team Manager',
    role: 'Team Manager',
    location: 'Leeds, United Kingdom',
  }

  const handleEditProfile = () => {
    // Handle edit profile action
    console.log('Edit profile clicked')
  }

  // const handleEditPersonalInfo = () => {
  //   // Handle edit personal info action
  //   console.log('Edit personal info clicked')
  // }

  return (
    <ProfileCard
      profileData={profileData}
      onEditProfile={handleEditProfile}
    // onEditPersonalInfo={handleEditPersonalInfo}
    />
  )
}

export default Profile