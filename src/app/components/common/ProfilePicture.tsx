'use client'
import { useState } from 'react';
import Image from 'next/image'

type ProfilePictureProps = {
    profiles: string[];
};

const ProfilePicture = ({ profiles }: ProfilePictureProps) => {
    const [profileIndex, setProfileIndex] = useState(() => {
        if (profiles.length === 0) return 0;
        return Math.floor(Math.random() * profiles.length);
    });

    const handleProfilePicUpdate = () => {
        if (profiles.length <= 1) return;

        setProfileIndex((currentIndex) => {
            let nextIndex = currentIndex;
            while (nextIndex === currentIndex) {
                nextIndex = Math.floor(Math.random() * profiles.length);
            }
            return nextIndex;
        });
    };

    if (profiles.length === 0) {
        return null;
    }

    return (
        <Image
            src={profiles[profileIndex]}
            width={250}
            height={250}
            alt="Antonio"
            className="rounded-full"
            onClick={handleProfilePicUpdate}
        />
    )
}

export default ProfilePicture
