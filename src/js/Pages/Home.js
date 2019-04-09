import React, {useContext} from 'react'
import HomeComponent from '../Components/Home'
import representativeContext from '../state/context/representative-context';



const Home = () => {
    const context = useContext(representativeContext)
    console.log(context)
    return <HomeComponent />
}


export default Home