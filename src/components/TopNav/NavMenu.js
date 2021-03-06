import React from 'react'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import * as auth from '../../services/authNService'

export const mapStateToProps = (state) => {
    return {
        alias: state.auth.userAlias
    }
}

export const NavMenu = ({dispatch, alias}) =>
<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
>
    <MenuItem primaryText={ alias }/>
    <MenuItem primaryText={<Link to="/search" >Incident Search</Link>} />
    <MenuItem primaryText={<Link to="/" onClick={() => dispatch(auth.logOut)}>LogOut</Link>} />
    <MenuItem primaryText={<Link to="/debug" >Debug</Link>} />
</IconMenu>


export default connect(mapStateToProps)(NavMenu)