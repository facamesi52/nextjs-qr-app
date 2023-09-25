import React from 'react';
import Link from 'next/link';
import './home.css';
const HomePage = () => {
  return (
    <div className='contenedorHome'>
      <img className='iconoImage'src="https://res.cloudinary.com/drnclewqh/image/upload/v1695414968/hotelImages/uaomixpdynmpysmjvnqf.png" alt="icono"/>
      <img className='imageExample' src="https://res.cloudinary.com/drnclewqh/image/upload/v1695413783/hotelImages/hak4ghpyj8wc7p0oximl.svg" alt="exameple-qr" />
      <div className='textHomePage'>
      <h1>Welcome to Emergency QR</h1>
      <p>
      Are you concerned about your safety and that of your loved ones while on the go? We have the perfect solution for you!
      Emergency QR is the ultimate platform to bring you peace of mind in emergency situations.
      </p>
      <br />
      <h2>How It Works</h2>
      <ol type='A'>
        <li>1. Sign Up or Log In</li>
        <li>2. Generate Your QR Code</li>
        <li>3. Place Your QR Code: Print or display your QR code on your car, bag, wallet, or anywhere you prefer.</li>
        <li>4. In Case of Emergency: If you find yourself in an emergency situation and someone needs to contact you, they only need to scan your QR code. It is that simple!</li>
      </ol>
      <br />
      </div>
      <Link href="/dashboard">
      <button className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-blue-500 text-lg font-bold text-white">
      Go!
      </button>
      </Link>
    </div>
  )
}

export default HomePage