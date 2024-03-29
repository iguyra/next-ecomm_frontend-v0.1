import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';

import Header from '../../components/Heading';
import Layout from '../../components/Layout';
import URLbaseAPI from '../../functions/URLbaseAPI';
import {
  getServerSideToken,
  getClientSideToken,
  redirectPages,
  getFrontUser,
  redirectPage,
} from '../../functions/fauthContoller';

function user(props) {
  let { user } = props;

  const logUserOut = async () => {
    cookieCutter.set('isLoggedIn', '', { expires: new Date(0) });
    const { data } = await axios.post(`${URLbaseAPI}/api/users/logout`);
    console.log(data);
    Router.push('/');
  };

  console.log('yess');

  return (
    <Layout>
      <section className="user">
        <div className="user__container">
          <div className="user__details">
            <p className="user__email">{user.email}</p>
            <p className="user__name">
              {user.firstname ? `welcome, ${user.firstname}` : 'welcome'}
            </p>
          </div>
          <div className="user__star">
            <i className="fas fa-user-check"></i>
          </div>
        </div>
      </section>
      <div className="module">
        <p className="module__header">my isave account</p>
      </div>
      <section className="account">
        <ul className="account__list">
          <li className="account__item">
            <div className="account__first">
              <i className="fab fa-first-order"></i>
              <Link href="/orders">
                <a className="account__orders">orders</a>
              </Link>
            </div>
            <i className="fas fa-angle-double-right"></i>
          </li>
          <li className="account__item">
            <div className="account__first">
              <i className="far fa-heart"></i>
              <Link href="/saveditems">
                <a className="account__orders">saved items</a>
              </Link>
            </div>
            <i className="fas fa-angle-double-right"></i>
          </li>
        </ul>
      </section>
      <div className="module">
        <p className="module__header">account settings</p>
      </div>
      <section className="account">
        <ul className="account__list">
          <li className="account__item">
            <div className="account__first">
              <i className="fas fa-info-circle"></i>
              <Link href="/user/edit">
                <a className="account__orders">details</a>
              </Link>
              <p className="account__orders"></p>
            </div>
            <i className="fas fa-angle-double-right"></i>
          </li>
          <li className="account__item">
            <div className="account__first">
              <i className="fas fa-key"></i>{' '}
              <Link href="/user/updatepassword">
                <a className="account__orders">change paswword</a>
              </Link>
            </div>
            <i className="fas fa-angle-double-right"></i>
          </li>
        </ul>
      </section>
      <div className="logout">
        <a href="/">
          <a onClick={logUserOut} className="logout__word">
            logout
          </a>
        </a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { req, res } = ctx;
    let config;
    let token = ctx.req.cookies.token;

    if (req) {
      console.log('yeess');
      config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          Cookie: req ? `token=${token}` : '',
        },
      };
    }

    const { data } = await axios.get(`${URLbaseAPI}/api/users/cart`, config);
    console.log(data, ctx.req.cookies.token);
    // const data = {
    //   user: {
    //     email: 'res@res.com',
    //   },
    // };
    return {
      props: { user: data ? data.user : {} }, // will be passed to the page component as props
    };
    // return {
    //   user: data ? data.user : {}, // will be passed to the page component as props
    // };
  } catch (err) {
    console.log('erorrr', err.response.data.error.statusCode === 401, !ctx.req);

    if (err.response.data.error.statusCode === 401) {
      redirectPages(ctx, err);
    }
  }
}

export default user;
// if (!token) {
//   if (typeof window === 'object') {
//     return Router.push('/login');
//   } else {
//     if (req) {
//       res.writeHead(301, { location: '/login' });
//       return res.end();
//     }
//   }
// }
