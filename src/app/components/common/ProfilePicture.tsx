'use client'
import { useState } from 'react';
import Image from 'next/image'

const ProfilePicture = () => {
    const [profile, setProfile] = useState('/images/profileCBBA.jpg');

    const handleProfilePicUpdate = () => {
        if (profile === '/images/profileCBBA.jpg') {
            setProfile('/images/profileLP.jpg');
            return;
        }
        setProfile('/images/profileCBBA.jpg');
    }

    return (
        <Image
            src={profile}
            width={250}
            height={250}
            alt="Antonio"
            className="rounded-full"
            onClick={() => handleProfilePicUpdate()}
        />
    )
}

export default ProfilePicture
