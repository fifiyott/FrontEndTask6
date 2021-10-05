import Head from 'next/head'
import Image from "next/image";
import Styles from '../styles/Home.module.css'
import Users from './admin';
// import { getUsers } from "../redux/actions/actions";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";



export default function HomeStore() {
    return(
        <div>
            <Head>
                <title>List user</title>
                <meta name="keywords" content="list"></meta>
            </Head>

            <div>
                <Users />
            </div>
        </div>
    )
}

