export const searchReddit = async (searchVal) => {
  try{
    const response = await fetch(`https://www.reddit.com/search.json?q=${searchVal}&type=link`);
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse)
      return jsonResponse.data.children.map(post => {
        const data = post.data;
        return {
          title: data.title,
          poster: data.author,
          timePosted: data.created,
          downVotes: data.downs,
          upVotes: data.ups,
          numComments: data.num_comments,
          permalink: data.permalink,
          url: data.url,
          content: data.selftext,
          id: data.id
        };
      });
    }
    throw new Error('Request Failed!')
  } catch(error){
    console.log(error)
    return 'An error has occured. Please try again.'
  }
  
}

export const fetchPostData = async (permalink)=>{
  try{
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse)
      return jsonResponse;
    }
    throw new Error('Request Failed!')
  } catch(error){
    console.log(error)
    return 'An Error has occured. Please try again.'
  }
}

export const fetchSubReddits = async () => {
  try{
    const response = await fetch(`https://www.reddit.com/subreddits.json?limit=10`)
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse)
      return jsonResponse.data.children.map(subReddit => {
        const data = subReddit.data;
        return{
          name: data.display_name_prefixed,
          url: data.url,
          icon: data.community_icon.split('?')[0],
          banner: data.banner_img,
          id: data.id
        }
      })
    }
    throw new Error('Request Failed!');
  } catch (error){
    console.log(error)
    return 'An error has occured. Please try again.'
  }
}