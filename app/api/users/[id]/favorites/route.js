import { connectToDB } from "@utils/database";
import Favorite from "@models/favorite";
import Prompt from "@models/prompt";

//GET Favorites 

export const GET = async (req, { params }) => { 
  try {
    await connectToDB();

    const favorites = await Favorite.find({
      userId: params.id });

    if(!favorites) return new Response("favorite prompt not found", {status: 404});


    //extract postId from favorites. 
    const favoritePostIds = favorites.map((favorite) => favorite.postId);

    //fetch corresponding post content 
    const posts = await Prompt.find({ _id: {$in: favoritePostIds}}).populate('creator');

    return new Response(JSON.stringify(posts), {status: 200});


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

export const DELETE = async (req, { params, postId }) => {
  try {
    await connectToDB();

    await Favorite.deleteMany({
    userId: params.id,
    postId: postId
    });
    return new Response("Favorite deleted successfully", {status: 200})
  } catch (error) {
    return new Response("Failed to delete Favorite", {
      status: 500
    })
  }
}