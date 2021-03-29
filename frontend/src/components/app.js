import React from 'react';
import CookieConsent from "react-cookie-consent";
import { Redirect, Link } from 'react-router-dom';

const App = () => {
	return (
		<>
			{document.cookie === "" ?
				<div className="landingBG">
					<img src="loading.gif" alt="loading" />
				</div>
				: <Redirect to={{
					pathname: "/characters",
					cookie: document.cookie
				}}
				/>
			}

			<CookieConsent
				location="bottom"
				buttonText={
					<Link to="/">
						<span id="cookieBtn">Understand</span>
					</Link>
				}
				cookieName="myAwesomeCookieName2"
				style={{ background: "#c21010" }}
				buttonStyle={{ background: "#1d1d1d", color: "white", fontSize: "13px" }}
				buttonWrapperClasses="cookieBtnDiv"
				expires={150}
			>
				<p className="cookie-text">This website uses cookies to enhance the user experience.{" "}</p>
			</CookieConsent>
		</>
	)
}

export default App;
