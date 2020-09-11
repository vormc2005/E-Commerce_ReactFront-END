import React, {Fragment} from 'react'
import Menu from './Navbar'
import "../styles.css"

const Layout = ({title="Title",
    description="Welcome to my APP",
    className, 
    children})=> {


    return (
        <Fragment>
        <Menu/>
        <div>
            <div className='jumbotron'>
                <h2 className="mt-3">{title}</h2>
                <p className="lead">{description}</p>
                <br/>   
                <h2>This is a sample web-site, it is not meant for shopping!!!</h2>         
            </div>
           
            {/* Any content that is under the jumbotron */}
            <div className={className}>
                {children}
            </div>
           
        </div>
        </Fragment>


    )
}

export default Layout
