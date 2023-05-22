import React from 'react';
import {
  Disclosure,
  Menu as MenuHead,
  Transition,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../public/dogecoin-logo.svg';
import bitcoinLogo from '../../public/bitcoin-btc-logo.svg';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import { connect } from 'react-redux';

const mapStateToProps = (_state, _) => ({});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch),
});

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Ngoc Nguyen',
        email: 'ngoc@example.com',
        imageUrl: logo,
      },
      navigation: [
        {
          key: 'dashboard',
          name: 'Dashboard',
          to: '/',
          href: '#',
          current: false,
        },
        {
          key: 'crypto',
          name: 'Crypto',
          to: '/crypto',
          href: '#',
          current: false,
        },
      ],
      userNavigation: [{ name: 'Your Profile', href: '#' }],
    };
  }

  componentWillMount() {
    const { location } = this.props;
    this.changeNavigation(location.pathname.slice(1));
  }

  changeNavigation(key) {
    const { navigation } = this.state;
    const newNavigation = navigation.map((item) =>
      item.key === key
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    this.setState({
      navigation: newNavigation,
    });
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  handleLogout() {
    const { loginActions } = this.props;
    loginActions.logout().then(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    const { user, navigation, userNavigation } = this.state;
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src={bitcoinLogo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          onClick={() =>
                            this.changeNavigation(item.key)
                          }
                          className={this.classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={
                            item.current ? 'page' : undefined
                          }
                          key={item.name}
                          to={item.to}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">
                        View notifications
                      </span>
                      <BellIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>

                    {/* Profile dropdown */}
                    <MenuHead as="div" className="relative ml-3">
                      <div>
                        <MenuHead.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">
                            Open user menu
                          </span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </MenuHead.Button>
                      </div>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuHead.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <MenuHead.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={this.classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </MenuHead.Item>
                          ))}
                          <MenuHead.Item key="sign-out">
                            {({ active }) => (
                              <a
                                href="#"
                                className={this.classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => this.handleLogout()}
                              >
                                Sign out
                              </a>
                            )}
                          </MenuHead.Item>
                        </MenuHead.Items>
                      </Transition>
                    </MenuHead>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={this.classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">
                      View notifications
                    </span>
                    <BellIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Menu));
