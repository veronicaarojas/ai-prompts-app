'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';


 
 

function ProfilePage() {
  const { data: session } = useSession();
  const Router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      if(session?.user.id) {
        setPosts(data);
      }
      }

    fetchPosts();

  }, [])

  const handleEdit = () => {
    
  }

  const handleDelete = async () => {

  }

  return (
    <div>

    
    <Profile
    name="My"
    desc="Welcome to your profile"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
    <div>
    </div>
    </div>
  )
}

export default ProfilePage