import React, {Fragment} from 'react'
import Menu from './Navbar'

const Layout = ({title="Title",
    description="Welcome to my APP",
    className, 
    children})=> {


    return (
        <Fragment>
        <Menu/>
        <div>
            <div className='jumbotron'>
                <h2>{title}</h2>
                <p className="lead">{description}</p>            
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
