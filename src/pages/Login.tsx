import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loginThunk } from '../features/Auth/authThunk';
import { Button, Loading } from '../components';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ILogin {
	email: string;
	password: string;
}

const Login = () => {
	const dispatch = useAppDispatch();
	const { isLoading, success, auth } = useAppSelector((store) => store.auth);
	const [userToken, setUserToken] = useLocalStorage('token', '');
	const navigate = useNavigate();
	const [user, setUser] = useState<ILogin>({
		email: '',
		password: '',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;

		setUser({ ...user, [name]: value });
	};

	const onSubmitHandler = () => {
		dispatch(loginThunk(user));
	};

	useEffect(() => {
		if (success && auth?.token) {
			setUserToken(auth?.token);
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	return (
		<Container>
			<div className='login__form flex-center'>
				{isLoading ? (
					<Loading />
				) : (
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<h2>Login to Airbnb</h2>
						<p>
							Find vacation rentals, cabins, beach houses, unique homes and
							experiences around the world.
						</p>
						<div className='login__input'>
							<label htmlFor='email'>Username</label>
							<input
								type='email'
								placeholder='your-email@gmail.com'
								{...register('email', { required: true })}
								onChange={onChangeHandler}
							/>
						</div>
						<div className='login__input'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								placeholder='Your password'
								{...register('password', { required: true, min: 6 })}
								onChange={onChangeHandler}
							/>
						</div>

						<Button>Login</Button>
					</form>
				)}
			</div>
			<div className='login__image'>
				<img
					src='https://preview.colorlib.com/theme/bootstrap/login-form-01/images/xbg_1.jpg.pagespeed.ic.nj5iPvtRed.webp'
					alt='travel'
				/>
			</div>
		</Container>
	);
};

const Container = styled.main`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: var(--clr-secondary);
	display: grid;
	grid-template-columns: 1fr 1fr;

	.login__image {
		height: 100vh;
	}

	.login__form {
		height: 100vh;
		position: relative;
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 80%;
			max-width: 50rem;

			p {
				color: #b3b3b3;
				margin: 2rem 0;
			}

			.login__input {
				border-top-left-radius: var(--radius);
				border-top-right-radius: var(--radius);
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: flex-start;
				flex-direction: column;
				border: 1px solid #b3b3b3;
				padding: 1.5rem;

				label {
					font-size: 1.2rem;
					font-weight: 200;
					color: var(--clr-paragraph);
				}

				input {
					border: transparent;
					background-color: transparent;
					width: 100%;
					font-size: 2.5rem;
					:focus {
						background-color: transparent;
						border: transparent;
						outline: none;
					}
				}
			}

			.login__input:nth-child(2n) {
				border-top: none;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				border-bottom-left-radius: var(--radius);
				border-bottom-right-radius: var(--radius);
			}

			button {
				margin: 2rem 0;
			}
		}
	}

	@media only screen and(max-width: 992px) {
		grid-template-columns: 1fr;
	}
`;

export default Login;
