import { NextPage } from "next";
import UserProfile from "../components/user/UserProfile";

const UsersPage: NextPage = () => (
  <div>
    <h1>This is the users page.</h1>
    <p>Content</p>

    <UserProfile name="dennis" />
  </div>
);

export default UsersPage;
