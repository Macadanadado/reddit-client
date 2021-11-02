import SearchBar from './searchbar'
import SubReddits from './subreddits'

import { useSelector } from 'react-redux'
import { selectActiveSubReddit } from './subredditsSlice'
import { Link } from 'react-router-dom'

import './navbar.css'
import banner from '../images/defaultBanner.jpg'

export default function NavBar(){
  const activeSub = useSelector(selectActiveSubReddit)
  const defaultBanner = banner
  
  function changeBanner(activeSub){
    let bannerUrl;
    if(activeSub.banner){
      bannerUrl = activeSub.banner;
    } else {
      bannerUrl = defaultBanner;
    }
    
    return ({
      backgroundImage: `url(${bannerUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    })
  }

  return(
    <div id='navBar' style={changeBanner(activeSub)}>
      <h1 className='title'>Reddit Mini</h1>
      <SearchBar />
      <SubReddits />
    </div>
  )
}