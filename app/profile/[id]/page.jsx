'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/profile';


 
 

function UserProfilePage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('name');
  


  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      if(session?.user.id) {
        setUserPosts(data);
      }
      }

    fetchPosts();

  }, [params.id])

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
        const filteredPosts = userPosts.filter((p) => p._id === post._id);

        setUserPosts(filteredPosts);
      } catch(error) {

      }
    }
  }

  return (
    <div>

    
    <Profile
    name={`${username}'s`}
    desc={`Welcome to ${username}'s profile. Browse their posts below.`}
    data={userPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
    <div>
    </div>
    </div>
  )
}

export default UserProfilePage