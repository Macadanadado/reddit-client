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
      id: data.id
    };
  });
}

export const fetchPostData = async (permalink)=>{
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