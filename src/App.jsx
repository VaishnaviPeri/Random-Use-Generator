import axios from 'axios';
import { Fragment, useState } from 'react';
// import ButtonComponent from './components/Buttoncomponent'
import { FaEnvelope, FaMapMarker, FaPhone, FaUser, } from "react-icons/fa"

const App = () => {

  const [userData, setUserData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [hoveredUserInfo, setHoveredUserInfo] = useState(null);

  const onClickHandler = () => {
    console.log('button works')
    setLoading(true);
    axios.get('https://randomuser.me/api/')
      .then((response) => {
        console.log(response.data.results);
        setUserData(response.data.results);

      })
      .catch((error) => {
        // console.error('Error fetching data', error);
        console.log(error)
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });

  };



  const handleIconHover = (info) => {
    setHoveredUserInfo(info);
  }

  const handleIconLeave = () => {
    setHoveredUserInfo(null);
  };

  return (
    <>
      <div className='main__app'>
        <h1>RANDOM USER GENERATOR </h1>

        <button onClick={onClickHandler}>Random User</button>
        {Loading ? (
          <h1>Laoding.....</h1>
        ) : (

          <div className="user">
            {userData.map((user) => {
              return (

                < Fragment key={user.cell}>
                  <div className='user__card'>
                    <img src={user.picture.large} alt='user__picture' />
                  </div>

                  <div className='icon__container'>

                    <FaUser size={40} className='user__icon'
                      onMouseEnter={() =>
                        handleIconHover(`${user.name.first} ${user.name.last}`)
                      }
                      onMouseLeave={handleIconLeave}
                    />


                    <FaPhone size={40} className='user__icon'
                      onMouseEnter={() => handleIconHover(user.phone)}
                      onMouseLeave={handleIconLeave}
                    />

                    <FaEnvelope size={40} className='user__icon'
                      onMouseEnter={() => handleIconHover(user.email)}
                      onMouseLeave={handleIconLeave}
                    />



                    <FaMapMarker size={40} className='user__icon'
                      onMouseEnter={() =>
                        handleIconHover(`${user.location.city}, ${user.location.country}`)}
                      onMouseLeave={handleIconLeave}
                    />


                  </div>

                  {hoveredUserInfo && (
                    <p>{hoveredUserInfo}</p>
                  )}
                </Fragment>

              )
            })}

          </div>
        )

        }
      </div>
    </>
  )
}

export default App
