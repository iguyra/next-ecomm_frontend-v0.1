import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';
import Loader from '../components/Loader/Loader';
import Link from 'next/link';
import URLbsaeAPI from '../functions/URLbaseAPI';
import {
  getFrontUser,
  redirectPage,
  getServerSideToken,
  getClientSideToken,
} from '../functions/fauthContoller';

class forgotpassword extends React.Component {
  state = {
    email: '',
    data: {},
    errorMsg: '',
    error: false,
    isSubmiting: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      this.setState({ isSubmiting: true });

      const { email } = this.state;

      const { data } = await axios.patch(
        `${URLbsaeAPI}/api/users/forgotPassword`,
        {
          email,
        }
      );
      this.setState({ error: false });
      this.setState({ isSubmiting: false });

      console.log('password reset sent', data);
      // Router.push("/");
      this.setState({ data: data });
    } catch (error) {
      this.setState({ errorMsg: error.response.data.message });
      console.log(error.response.data);
      this.setState({ error: true });
      this.setState({ isSubmiting: false });
    }
  };

  render() {
    const { data, error, errorMsg, isSubmiting } = this.state;
    return (
      <section className="siginin" id="signin">
        {error ? <p className="error">{errorMsg}</p> : ''}

        <Link href="/">
          <a className="siginin__sitename" id="sitename">
            iguyra <span>&larr;</span>
          </a>
        </Link>

        {data.message ? (
          <span className="success">
            reset link sent to your the email provided, please log into the
            email to reset your password
          </span>
        ) : (
          ' we will send you an email to reset your password'
        )}

        <form className="siginin__form" onSubmit={this.handleSubmit} action="">
          <label className="siginin__label" htmlFor="email">
            <input
              className="siginin__input"
              name="email"
              type="email"
              id="email"
              placeholder="please enter your email"
              onChange={this.handleChange}
            />
          </label>

          <button className="siginin__button">
            {isSubmiting ? <Loader /> : 'submit'}
          </button>

          <div className="siginin__details">
            <Link href="/login">
              <a className="siginin__register" id="createaccount">
                login
              </a>
            </Link>
          </div>
        </form>
      </section>
    );
  }
}

export async function getServerSideProps(ctx) {
  try {
    const { req, res } = ctx;

    let token = req.cookies.token;

    // if (token) {
    //   if (typeof window === 'object') {
    //     return Router.push('/');
    //   } else {
    //     if (req) {
    //       res.writeHead(301, { location: '/' });
    //       return res.end();
    //     }
    //   }
    // }
    console.log('token', token);

    return {
      props: {}, // will be passed to the page component as props
    };
  } catch (err) {
    if (err) {
      if (typeof window === 'object') {
        console.log('browser object');
        Router.push('/forgotpassword');
      }
    }
  }
}

export default forgotpassword;
