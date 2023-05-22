import React from 'react';
import logo from '../../../public/bitcoin-btc-logo.svg';
import { withRouter } from 'react-router-dom';
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
import Loading from '../utilities/loading';
import { toast } from 'react-hot-toast';
import { isEmpty } from 'lodash';

const mapStateToProps = (state, _props) => ({
  error: state.loginInfor.error,
  loading: state.loginInfor.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch),
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSignUpForm: {
        email: '',
        password: '',
        passwordConfirm: '',
        terms: false,
        validators: {
          email: ['email'],
          password: ['password'],
          passwordConfirm: ['password', 'password_confirm'],
        },
        errors: {
          email: [],
          password: [],
          passwordConfirm: [],
        },
        touched: {
          email: false,
          password: false,
          passwordConfirm: false,
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

  handleSignup(event) {
    event.preventDefault();
    const { loginActions } = this.props;
    const { email, password, passwordConfirm } =
      this.state.emailSignUpForm;
    loginActions
      .signUpByEmail({
        email,
        password,
        password_confirmation: passwordConfirm,
      })
      .then((data) => {
        if (data) {
          loginActions.resetErrors([]);
          toast.success('Register successfully');
          this.props.history.push('/login');
        }
      });
  }

  onFieldChange(event, field) {
    const _target = event.target;
    const { emailSignUpForm } = this.state;
    const value =
      _target.type === 'checkbox' ? _target.checked : _target.value;
    this.setState(
      {
        emailSignUpForm: {
          ...emailSignUpForm,
          [field]: value,
        },
      },
      () => this.validateField(field, value)
    );
  }

  onFieldBlur(field) {
    const { emailSignUpForm } = this.state;
    this.setState({
      emailSignUpForm: {
        ...emailSignUpForm,
        touched: {
          ...emailSignUpForm.touched,
          [field]: true,
        },
      },
    });
  }

  isSignupButtonDisabled() {
    const { emailSignUpForm } = this.state;
    const { errors } = emailSignUpForm;
    const { email, password, passwordConfirm } = errors;
    if (
      isEmpty(email) &&
      isEmpty(password) &&
      isEmpty(passwordConfirm) &&
      emailSignUpForm.terms
    ) {
      return false;
    }
    return true;
  }

  validateField(field, value) {
    const { emailSignUpForm } = this.state;
    if (emailSignUpForm?.validators[field]) {
      const errors = [];
      emailSignUpForm?.validators[field].forEach((validator) => {
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
              errors.push(' MUST contain at least 8 characters');
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
        emailSignUpForm: {
          ...emailSignUpForm,
          errors: {
            ...emailSignUpForm?.errors,
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
          errors={error?.errors}
          open={error.failed}
          onClose={() => loginActions.resetErrors([])}
        />
      );
    }
  };

  render() {
    const { emailSignUpForm } = this.state;
    const { errors, touched } = emailSignUpForm;
    const { error, loading } = this.props;
    const isDisabled = this.isSignupButtonDisabled();
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
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
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => this.handleSignup(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={emailSignUpForm?.email}
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
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={emailSignUpForm?.password}
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
                    onBlur={() => this.onFieldBlur('password')}
                  />
                  {touched.password && errors.password.length > 0 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      <ul>
                        {errors.password.map((item) => {
                          return <li>{item}</li>;
                        })}
                      </ul>
                    </span>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="password-confirm"
                    id="password-confirm"
                    placeholder="••••••••"
                    value={emailSignUpForm?.passwordConfirm}
                    className={`${
                      (touched.passwordConfirm &&
                        errors.passwordConfirm.length > 0) ||
                      error.failed
                        ? 'border-red-500'
                        : null
                    } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    onChange={(e) =>
                      this.onFieldChange(e, 'passwordConfirm')
                    }
                    onBlur={() => this.onFieldBlur('passwordConfirm')}
                  />
                  {touched.passwordConfirm &&
                  errors.passwordConfirm.length > 0 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      <ul>
                        {errors.passwordConfirm.map((item) => {
                          return <li>{item}</li>;
                        })}
                      </ul>
                    </span>
                  ) : null}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="terms"
                      id="terms"
                      placeholder="••••••••"
                      value={emailSignUpForm?.terms}
                      className={`${
                        error.failed ? 'border-red-500' : null
                      } w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800`}
                      onChange={(e) => this.onFieldChange(e, 'terms')}
                      onBlur={() => this.onFieldBlur('terms')}
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{' '}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  disabled={this.isSignupButtonDisabled()}
                  type="submit"
                  className="disabled:bg-gray-300 disabled:text-gray-400 w-full bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="#"
                    onClick={() => this.props.history.push('/login')}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
