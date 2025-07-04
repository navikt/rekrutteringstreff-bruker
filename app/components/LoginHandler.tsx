'use client';

import {useEffect} from "react";

export default function LoginHandler() {

    const sessionUrl= process.env.NEXT_PUBLIC_SESSION_URL
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

    const fetchSessionInfo = async () => {
        const response = await fetch(`${sessionUrl}`, {
            credentials: 'include',
        }).catch((e) => {
            console.error('Det oppstod en feil ved henting av session status', e.message);
        });
        if (!response) return;

        if (response.status === 401) {
            const rekrutteringstreffId = window.location.pathname.split('/').at(-1)
            console.log(`RekrutteringstreffId: ${rekrutteringstreffId}`);

            window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
        }
    };

    useEffect(() => {
        fetchSessionInfo()
    });

    return (
        <div></div>
    )
}
