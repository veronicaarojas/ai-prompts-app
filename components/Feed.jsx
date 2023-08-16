"use client";
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
  <div className='mt-16 prompt_layout'>
    {data.map((post) => (
    <PromptCard
    key={post._id}
    post={post}
    handleTagClick={handleTagClick}/>
    ))}
  </div>
  )
}

const Feed = () => {
  
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);


  //function defined takes in the argument searchtext.
  //we know from below that searchtext is e.target.value when
  //the filterPrompts function is called 
  const filterPrompts = (searchtext) => {
    //create a regular expression based on the searchtext provided
    //by the user which is the input
    //'i' flag indicates case insensitive. 
    const regex = new RegExp(searchtext, "i");
    //use the filter method to decipher which posts should be displayed 
    //from the posts array 
    return posts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
      );

  }

  const handleSearchChange = (e) => {
    //clear any previous timeout set for the search
    //by setting searchTimeout back to null. 
    clearTimeout(searchTimeout); 
    //update the search text with the current value
    //of the user input. 
    setSearchText(e.target.value);

    //set up the delayed action using setSearchTimeout
    setSearchTimeout(
      //the delayed action is defined within the setTimeout Callback
      setTimeout(() => {
        //call filterPrompts function with the value of the 
        //input field 
        const searchResult = filterPrompts(e.target.value);
        //set the search results 
        setSearchResults(searchResult);
      }, 500)
      //setTimeout triggered if user stops typing after 500ms(5 seconds)
    );
  };

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      }

    fetchPosts();

  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type="text"
        placeholder='Search for a tag or a username.'
        value={searchText}
        onChange={handleSearchChange}
        required 
        className='search_input peer'/>
      </form>

      {/* the data will be different based on whether
      the user has searched or not, so a ternary operator should be used 
      to decide this */}

      {searchText ? (
      <PromptCardList
      data={searchResults}
      // handleTagClick={() => {}}
      />
       ) : (
    <PromptCardList
      data={posts}
      // handleTagClick={() => {}}
      /> 
       )}
      
    </section>
    
  )
}

export default Feed