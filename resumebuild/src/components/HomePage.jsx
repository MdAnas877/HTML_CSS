import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './SideBar'
import templates1 from '../assets/image/temp1.jpg'
import templates2 from '../assets/image/temp2.jpg'
import '../assets/style/style.css'
import { Link } from 'react-router-dom'

function HomePage() {
    const[template,setTempletes]  = useState([templates1,templates2]);
    return (
        <div>   
            <Header />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col py-2">
                        <div className="image-container">
                        {
                            template.map((val,index)=>{
                                return (
                                  <div key={index} className="image-wrapper">
                                    <img src={val}
                                     style={{
                                        height : '200px',
                                        width  :  '200px',
                                        display : 'inline-block'
                                     }}
                                    />
                                    <Link to='/firstform'>
                                    <button className='btn btn-primary'
                                                    style={{position: 'absolute',top:'60%' , left:'20%',}}
                                            >
                                            Use Template
                                    </button>
                                    </Link>
                                  </div>
                                )
                            })
                        }  
                     </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage