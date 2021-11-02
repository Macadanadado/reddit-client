export const searchReddit = async (searchVal) => {
  const response = await fetch(`https://www.reddit.com/search.json?q=${searchVal}&type=link`);
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

//need to refactor this so fetchPostComments can be used since its the same fetch
export const fetchSubRedditPosts = async (subreddit)=>{
  const response = await fetch(`https://www.reddit.com${subreddit}.json`);
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
    }
  })
}

export const fetchPostComments = async (permalink)=>{
  const response = await fetch(`https://www.reddit.com${permalink}.json`);
  const jsonResponse = await response.json();
  //console.log(jsonResponse)
  return jsonResponse[1].data.children.map(user => {
    const userComment = user.data
    return {
      poster: userComment.author,
      comment: userComment.body,
      id: userComment.id
    }
  })
}

export const fetchSubReddits = async () => {
  const response = await fetch(`https://www.reddit.com/subreddits.json?limit=10`)
  const jsonResponse = await response.json();
  console.log(jsonResponse)
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