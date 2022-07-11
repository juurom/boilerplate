import React, {useEffect} from 'react'
import axios from 'axios'


function LandingPage() {
    //landingpage에 들어오면 useEffect 실행
    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data));
    }, [])
    
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage