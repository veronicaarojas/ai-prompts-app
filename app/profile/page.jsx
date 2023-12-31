'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';


 
 

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  }, [posts, session?.user.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
    
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => p._id === post._id);

        setPosts(filteredPosts);
      } catch(error) {

      }
    }
  }

  if(status === "unauthenticated") {
    return <p>You are not authorized to view this page. Please Sign In.</p>
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