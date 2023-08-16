import { connectToDB } from "@utils/database";
import Favorite from "@models/favorite";

//GET Favorites 

export const GET = async (req, { params }) => { 
  try {
    await connectToDB();

    const favorite = await Favorite.find({
      userId: params.id
    }).populate('userId');
    if(!favorite) return new Response("favorite prompt not found", {status: 404});

    return new Response(JSON.stringify(favorite), {
      status:200 
    })

  } catch (error) {
    return new Response('Failed to fetch favorite prompts.', {
      status:500 
    })
  }

}

//ADD a Favorite 

export const POST = async (req) => {
  const { userId, postId } = await req.json();
  
  try { 
  await connectToDB();
  const newFavorite = new Favorite({
     userId,
     postId
  })
  
  await newFavorite.save();
  
  return new Response(JSON.stringify(newFavorite), {
    status: 201
  })
  } catch (error) {
   return new Response('failed to create a new response', {status: 500})
  }
  }

//Remove a favorite 

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Favorite.findByIdAndRemove(params.id);
    return new Response("Favorite deleted successfully", {status: 200})
  } catch (error) {
    return new Response("Failed to delete Favorite", {
      status: 500
    })
  }
}