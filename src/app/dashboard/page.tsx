'use client'
import { UserButton, useUser } from "@clerk/nextjs";

const DashboardPage = () => {
    const { user } = useUser();
    const id = user?.id;
    const userName = user?.username
    const userEmail = user?.primaryEmailAddress?.emailAddress
    console.log(id, userName, userEmail);
  return (
    <div>
        <h2>DashboardPage</h2>
        <UserButton/>
    </div>
  )
}

export default DashboardPage