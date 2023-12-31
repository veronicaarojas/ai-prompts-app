'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PromptCard from '@components/PromptCard';

const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState([]);

  


  useEffect(() => {
    fetchFavorites();
  },[session?.user.id])

  const fetchFavorites = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/favorites`);
    const data = await response.json();

    if(session?.user.id) {
      setFavorites(data);
    }
  }

  const removeFromFavorites = async (post) => {
    try {
      await fetch(`/api/users/${session?.user.id}/favorites`, {
       method: 'DELETE',
       body: JSON.stringify({
         postId: post._id,
         userId: session?.user.id,
       })
      })
      fetchFavorites();
 
     } catch(error) {
       console.log(error);
     }
  }

  

  if(status === "unauthenticated") {
    return <p>You are not authorized. Please Sign In.</p>
  }


  return (
    <section className='w-full'>
    <h1 className='head_text text-left'>
      
      <span className='blue_gradient'>
      Your Favorites 
    </span>
    </h1>
    <p className="desc text-left"> A place for all the prompts you liked enough to save</p>

    <div className='mt-10 prompt_layout'>
      {favorites.map((favorite) => (
      <PromptCard
      key={favorite._id}
      post={favorite}
      updateFavorites={fetchFavorites()}
      favorites={favorites}
      onRemoveFromFavorites={removeFromFavorites}
      />
      ))}
    </div>
    

  </section>
  )
}

export default FavoritesPage