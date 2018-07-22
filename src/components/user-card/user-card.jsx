import React, { Component } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import './user-card.scss';
import AppEmitter from '../../store/emitter';
class UserCard extends Component {
    constructor(props) {
        super(props);
        this.card = this.card.bind(this);
        this.state = { open: false };
        let { dispatch, store } = this.props;
        this.event = () => {
            this.setState({ open: false });
        };
        this.AppEmitter = AppEmitter;
        window.addEventListener('click', this.event);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.event);
    }
    card({ ref, placement, style }) {
        let { user, user_roles } = this.props;
        return (
            <div
                className="card"
                ref={ref}
                style={style}
                data-placement={placement}
                onClick={event => event.stopPropagation()}
            >
                <div className="section-1">
                    <div className="in">
                        <img
                            src={user.avatar}
                            alt=""
                            className="user-profile"
                        />
                        <p className="user-name">
                            {user.name}{' '}
                            <span className="fade">#{user.tag}</span>{' '}
                        </p>
                    </div>
                </div>
                <div className="section-2">
                    {user_roles.map(role => (
                        <span
                            key={role._id}
                            className="role"
                            style={{
                                borderColor: role.color,
                                color: role.color
                            }}
                        >
                            <span
                                className="circle"
                                style={{ backgroundColor: role.color }}
                            />
                            {role.name}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
    render() {
        let { id, dispatch, store } = this.props;
        let { state } = this;
        return (
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <span
                            onClick={event => {
                                this.setState({ open: !state.open });
                                event.stopPropagation();
                            }}
                            ref={ref}
                        >
                            {this.props.children}
                        </span>
                    )}
                </Reference>
                <Popper placement="left">
                    {({ ref, style, placement, arrowProps }) =>
                        state.open && this.card({ ref, placement, style })
                    }
                </Popper>
            </Manager>
        );
    }
}
export default UserCard;
