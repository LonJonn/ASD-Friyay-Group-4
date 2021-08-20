interface UserProfileProps {
  name: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name }) => (
  <div>
    <h1>User: {name}</h1>
  </div>
);

export default UserProfile;
