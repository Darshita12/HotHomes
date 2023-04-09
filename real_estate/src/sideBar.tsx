import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHelmetSafety, faBars, faHeart, faHouseChimneyMedical } from '@fortawesome/free-solid-svg-icons'
import '../src/CSS/sidebar.css';

import {
    MdSettings,
} from "react-icons/md";
import {
    IoNotificationsSharp
} from "react-icons/io5";
import {
    RiLogoutCircleRLine
} from "react-icons/ri";
import {

} from "react-icons/"
import { Link } from 'react-router-dom';

class SideBar extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { setSideBar: false };
        this.handleChangeSideBar = this.handleChangeSideBar.bind(this);
    }

    handleChangeSideBar() {
        this.setState({ setSideBar: !this.state.setSideBar })
    }
    handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userid')
        window.location.href = '/';
    }
    render() {
        let { setSideBar } = this.state;
        return (
            // <div className="container">
            //     <div className="content">
            <>
                {!setSideBar ? (
                    <div className="closedSideBar">
                        <nav>
                            <button onClick={this.handleChangeSideBar}>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <ul>
                                {localStorage.getItem('role') === 'user' || localStorage.getItem('role') == undefined ? (
                                    <a href={localStorage.getItem('role') === 'user' ? "/saved" : "/login"} title="Saved">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                ) : null
                                }

                                {localStorage.getItem('role') === 'builder' || localStorage.getItem('role') === 'admin' ? (

                                    <a href="/addProperty" title="Add Property">
                                        <FontAwesomeIcon icon={faHouseChimneyMedical} />
                                    </a>) : null
                                }
                                {localStorage.getItem('role') == 'admin' &&
                                    <a href="/addBuilder" title="Add Builder">
                                        <FontAwesomeIcon icon={faHelmetSafety} />
                                    </a>
                                }

                            </ul>
                        </nav>
                        <div>
                            <ul>
                                {/* <a href="/" title="Notification">
                                    <IoNotificationsSharp />
                                </a> */}
                                <a href="/" title="Settings">
                                    <MdSettings />
                                </a>
                            </ul>
                            {localStorage.getItem('role') &&

                                <span onClick={this.handleSignOut}>
                                    <RiLogoutCircleRLine />
                                </span>
                            }
                        </div>
                    </div>
                ) : (
                    <div className="openSideBar">
                        <section>
                            <nav>
                                <span>
                                    <button onClick={this.handleChangeSideBar}>
                                        <FontAwesomeIcon icon={faBars} />
                                    </button>
                                </span>
                                <ul>
                                    {/* <a href="/" title="Alguma coisa">
                                        <FontAwesomeIcon icon={faHelmetSafety} />
                                        <p>Builders</p>
                                    </a> */}
                                    {localStorage.getItem('role') === 'user' || localStorage.getItem('role') == undefined ? (
                                        <a href={localStorage.getItem('role') === 'user' ? "/saved" : "/login"} title="Saved">
                                            <FontAwesomeIcon icon={faHeart} />
                                            <p>Saved</p>
                                        </a>
                                    ) : null
                                    }
                                    {/* <a href={localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'builder' ? "/saved" : "/login"} title="Saved">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>Saved </p>
                                    </a> */}
                                    {localStorage.getItem('role') === 'builder' || localStorage.getItem('role') === 'admin' ? (

                                        <a href="/addProperty" title="Alguma coisa">
                                            <FontAwesomeIcon icon={faHouseChimneyMedical} />
                                            <p>Add Property</p>
                                        </a>) : null
                                    }
                                    {localStorage.getItem('role') === 'admin' &&
                                        <a href="/addBuilder" title="Add Builder">
                                            <FontAwesomeIcon icon={faHelmetSafety} />
                                            <p>Add Builder</p>
                                        </a>
                                    }
                                </ul>
                            </nav>
                            <div>
                                <ul>
                                    {/* <a href="/">
                                        <IoNotificationsSharp />
                                        <p> Notifications </p>
                                    </a> */}
                                    <a href="/">
                                        <MdSettings />
                                        <p> Settings </p>
                                    </a>

                                </ul>
                                {localStorage.getItem('role') != 'undefined' &&
                                    <span onClick={this.handleSignOut}>
                                        <RiLogoutCircleRLine />
                                        <p> Sign Out </p>
                                    </span>
                                }
                            </div>
                        </section>
                        <aside onClick={this.handleChangeSideBar} />
                    </div >
                )

                }
            </>
        )
    }
}
export default SideBar;