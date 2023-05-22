import React from 'react';
import logo from '../../../public/bitcoin-btc-logo.svg';
import { connect } from 'react-redux';
import AlertCustom from '../utilities/alert';
import {
  isIncludeNumber,
  isIncludeSpecialChars,
  isLowerCase,
  isUpperCase,
  isValidEmail,
  isValidPassword,
} from '../../utils/validators';
import * as loginActions from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Loading from '../utilities/loading';

const mapStateToProps = (state, _props) => ({
  error: state.loginInfor.error,
  loginInfor: state.loginInfor,
  loading: state.loginInfor.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLoginForm: {
        email: '',
        password: '',
        validators: {
          email: ['email'],
        },
        errors: {
          email: [],
        },
        touched: {
          email: false,
        },
      },
    };
  }

  componentWillMount() {
    document.body.classList.add('bg-gray-50');
  }

  componentWillUnmount() {
    document.body.classList.add(null);
  }

  handleLogin(event) {
    event.preventDefault();
    const { loginActions } = this.props;
    const { email, password } = this.state.emailLoginForm;
    loginActions.loginByEmail({ email, password }).then((data) => {
      if (data?.accessToken) {
        this.props.history.push('/');
      }
    });
  }

  onFieldChange(event, field) {
    const _target = event.target;
    const { emailLoginForm } = this.state;
    const value =
      _target.type === 'checkbox' ? _target.checked : _target.value;
    this.setState(
      {
        emailLoginForm: {
          ...emailLoginForm,
          [field]: value,
        },
      },
      () => this.validateField(field, value)
    );
  }

  onFieldBlur(field) {
    const { emailLoginForm } = this.state;
    this.setState({
      emailLoginForm: {
        ...emailLoginForm,
        touched: {
          ...emailLoginForm.touched,
          [field]: true,
        },
      },
    });
  }

  validateField(field, value) {
    const { emailLoginForm } = this.state;
    if (emailLoginForm?.validators[field]) {
      const errors = [];
      emailLoginForm?.validators[field].forEach((validator) => {
        switch (validator) {
          case 'email':
            if (!isValidEmail(value)) {
              errors.push('Invalid Email');
            }
            break;
          case 'password':
            if (!value) {
              errors.push('Field is required');
            }
            if (!isValidPassword(value)) {
              errors.push('Field is required');
              errors.push('MUST contain at least 8 characters');
            }

            if (!isLowerCase(value)) {
              errors.push(
                'MUST contain at least one lowercase letter'
              );
            }

            if (!isUpperCase(value)) {
              errors.push(
                'MUST contain at least one uppercase letter'
              );
            }

            if (!isIncludeNumber(value)) {
              errors.push('MUST contain at least one number');
            }

            if (!isIncludeSpecialChars(value)) {
              errors.push(
                'MUST contain at least one special character (!,#,$,%,&,(,),*,+,-,/,<,=,>,?,@,[,],^,_,{,|,},~ )'
              );
            }
            break;
          default:
            break;
        }
      });

      this.setState({
        emailLoginForm: {
          ...emailLoginForm,
          errors: {
            ...emailLoginForm?.errors,
            [field]: errors,
          },
        },
      });
    }
  }

  renderError = () => {
    const { error, loginActions } = this.props;
    if (error && error.failed) {
      return (
        <AlertCustom
          errors={[{ message: error.message }]}
          open={error.failed}
          onClose={() => loginActions.resetErrors([])}
        />
      );
    }
  };

  render() {
    const { emailLoginForm } = this.state;
    const { errors, touched } = emailLoginForm;
    const { error, loading, loginInfor } = this.props;
    if (loginInfor?.accountInfor?.access_token) {
      this.props.history.push('/crypto');
    }
    return (
      <>
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {loading.login ? <Loading /> : null}
            {this.renderError()}
            <a
              href="https://www.facebook.com/ngocnguyencmu"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-11 h-11 mr-2" src={logo} alt="logo" />
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => this.handleLogin(e)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={emailLoginForm?.email}
                      className={`${
                        (touched.email && errors.email.length > 0) ||
                        error.failed
                          ? 'border-red-500'
                          : null
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="name@gmail.com"
                      onChange={(e) => this.onFieldChange(e, 'email')}
                      onBlur={() => this.onFieldBlur('email')}
                    />
                    {touched.email && errors.email.length > 0 ? (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.email}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={emailLoginForm?.password}
                      className={`${
                        (touched.password &&
                          errors.password.length > 0) ||
                        error.failed
                          ? 'border-red-500'
                          : null
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      onChange={(e) =>
                        this.onFieldChange(e, 'password')
                      }
                      onBlur={() => this.onFieldBlur('email')}
                    />
                    {touched.password &&
                    errors.password.length > 0 ? (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.password}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-300">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <a
                      href="#"
                      onClick={() =>
                        this.props.history.push('/signup')
                      }
                      className="font-medium text-gray-600 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
