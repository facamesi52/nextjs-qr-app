import { SignUp } from "@clerk/nextjs";
import './sign-up.css';
 
export default function Page() {
  return(
    <div className="containerSign-up">
      <SignUp />;
    </div>
  ) 
}