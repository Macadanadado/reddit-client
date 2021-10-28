import SearchBar from './searchbar'
import SubReddits from './subreddits'


export default function NavBar(){
  return(
    <div>
      <h1>reddit client</h1>
      <SearchBar />
      <SubReddits />
    </div>
  )
}