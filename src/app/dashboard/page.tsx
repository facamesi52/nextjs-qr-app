'use client'
import { QRCode } from "react-qrcode";
import './dashboard.css'
import { UserButton, useUser } from "@clerk/nextjs";

const DashboardPage = () => {

    const { user } = useUser();
    const id = user?.id;
    const userName = user?.username
    const userEmail = user?.primaryEmailAddress?.emailAddress
    console.log(id, userName, userEmail);
  return (
    <div className="contenedorDash">
      <div className="encabezadoDash">
        <div><h3>{`Welcome ${userName}`}</h3></div>
      <UserButton/>
      </div>
      <br />
        <h2>Emergency QR</h2>
        <QRCode
        value={`/contact/${id}`}
        size={400}
        scale={10}
      />
      <h4> You can print this QR so people can contact you. This QR is unique </h4>
      <br />

    </div>
  )
}

export default DashboardPage