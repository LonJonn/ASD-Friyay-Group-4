import { withAuthRequired } from "../lib/with-auth-required";

const Protected: React.FC = () => <div>Secret</div>;

export default withAuthRequired(Protected);
