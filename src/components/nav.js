import SearchBar from './searchbar'
import SubReddits from './subreddits'

import { useSelector } from 'react-redux'
import { selectActiveSubReddit } from './subredditsSlice'

import './navbar.css'
import banner from '../images/defaultBanner.jpg'
import { useState } from 'react'

export default function NavBar(){
  const activeSub = useSelector(selectActiveSubReddit);
  const defaultBanner = banner;
  const [visibleNav, setVisibleNav] = useState(false)
  
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

  function handleClick(){
    if(!visibleNav){
      setVisibleNav(!visibleNav)
    } else {
      setVisibleNav(!visibleNav)
    }
  }

  return(
    <div id='navBar' style={changeBanner(activeSub)}>
      <h1 className='title'>Reddit Mini</h1>
      <SearchBar />

      <div className='mobileNavBar' >
        <button className='menuBtn' onClick={()=> handleClick()}>SubReddit's</button>
        <div className={visibleNav ? 'navIsVisible' : 'navIsNotVisible'}>
          <SubReddits />
        </div>
      </div>

      <div className='desktopNavBar'>
        <SubReddits />
      </div>

    </div>
  )
}