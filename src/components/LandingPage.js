import React from "react";
import { connect } from "react-redux";
import {
	startLoginWithGoogle,
	startLoginWithEmailAndPassword,
	startSignupWithEmailAndPassword,
} from "../actions/auth";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
const LandingPage = ({ startLoginWithGoogle, startLoginWithEmailAndPass, signup, match }) => {
	const isLoginPage = match.path === "/";

	const handleOnSubmit = (e) => {
		console.log(match);
		e.preventDefault();
		if (isLoginPage) {
			startLoginWithEmailAndPass(e.target.email.value, e.target.password.value);
		} else {
			signup(e.target.email.value, e.target.password.value);
		}
	};

	return (
		<div className="landingPage">
			<h1>Plan.IO</h1>
			<div className="landingPage-box">
				<h3 className="landingPage-header">{isLoginPage ? "Login" : "Signup"}</h3>
				<div className="landingPage-body">
					<Form onSubmit={handleOnSubmit}>
						<Form.Group controlId="formBasicEmail" className="landingPage-formGroup">
							<Form.Label>Email: </Form.Label>
							<Form.Control type="email" placeholder="Enter email" name="email" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="password" />
						</Form.Group>
						<Button variant="primary" type="submit" size="sm" block>
							{isLoginPage ? "Login" : "Signup"}
						</Button>
					</Form>
					<div className="landingPage-otherLinks">
						<Link to={isLoginPage ? "/signup" : "/"}>
							{isLoginPage ? "Don't" : "Already"} have an account? Click here!
						</Link>
						<p>Or</p>
						<GoogleButton
							onClick={startLoginWithGoogle}
							className="landingPage-otherLinks--googleBtn"
						/>
					</div>
				</div>
			</div>
			<p>Based on the ever popular Getting Things Done system by David Allen!</p>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
	startLoginWithEmailAndPass: (email, pass) =>
		dispatch(startLoginWithEmailAndPassword(email, pass)),
	signup: (email, password) => dispatch(startSignupWithEmailAndPassword(email, password)),
});

export default connect(undefined, mapDispatchToProps)(LandingPage);
