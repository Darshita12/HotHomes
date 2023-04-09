import styled, { keyframes } from "styled-components";

export const Styles = styled.div`
  .navbar { background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
    width: 100%;
	position: fixed;
    height: 10%;
    img{
        width: 60px
    }
}
  a, .navbar-nav, .navbar-light .nav-link {
    
    color: white !important;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: white;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
	height: 100%;
`;

export const Content = styled.div`
	height: 100%;
	display: flex;
`;

export const ClosedSideBar = styled.header`
	max-width: 60px;
	width: 100%;
	height: 90%;
    margin-top: 75px;
	border-radius: 0 12px 12px 0;

	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);

	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;

	svg {
		color: #f9f9f9;
	}

	ul li {
		cursor: pointer;
	}

	/* Links principais do app */
	nav {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		> button {
			width: 100%;
			padding: 18px;
            background:none;
            border: none;
			&:hover {
				svg {
					path {
						color: var(--third-color);
					}
				}
			}
		}

		> button svg {
			width: 24px;
			height: 24px;

			color: white;
		}

		> img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			margin-top: 16px;
		}

		ul {
			margin-top: 64px;
            margin-right: 35px;
			width: 100%;
			text-align: center;
			display: flex;
			align-items: center;
			flex-direction: column;

			a {
				width: 100%;
				padding: 16px 0;
				border-radius: 8px 0 0 8px;

				display: flex;
				align-items: center;
				justify-content: center;

				transition: background 0.3s;

				&:hover {
					background: var(--primary-background);

					svg {
						path {
							color: var(--third-color);
						}
					}
				}
				svg {
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	/* Icones que pode não ser tão principais no app */
	div {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		ul {
			margin-bottom: 16px;
            margin-right: 35px;
			text-align: center;
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;

			a {
				padding: 16px 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				transition: color 0.3s;
				&:hover {
					svg path {
						color: var(--third-color);
					}
				}
				svg {
					width: 20px;
					height: 20px;
				}
			}
		}

		span {
			padding: 16px 0;
			text-align: center;
			border-radius: 8px 8px 0 0;

			display: flex;
			align-items: center;
			justify-content: center;

			background: #2694E3;
			width: 100%;
			img {
				width: 32px;
				height: 32px;
				border-radius: 50%;
			}
		}
	}
`;

export const OpenSideBar = styled.header`
	height: 90%;
	width: 100%;
    margin-top:75px;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	background: var(--shadow-black-color);

	display: flex;
	align-items: center;

	svg {
		color: #f9f9f9;
	}

	section {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;

		max-width: 240px;
		height: 100%;

		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);;
		border-radius: 0 12px 12px 0;

		ul li {
			cursor: pointer;
		}

		/* Links principais do app */
		nav {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;

			width: 100%;

			> span {
				width: 100%;
				display: flex;
                // justify-content: center;
				// align-items: flex-start;

				button {
					cursor: pointer;
					padding: 18px;
                    background:none;
                    border: none;
					&:hover {
						svg path {
							color: var(--third-color);
						}
					}

					svg {
						width: 24px;
						height: 24px;

						color: white;
					}
				}
			}

			div {
				margin-top: 16px;

				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 24px;
				flex-direction: row;
				gap: 16px;

				img {
					width: 36px;
					height: 36px;
					border-radius: 50%;
				}

				h1 {
					color: #fff;
					font-size: 14px;

					animation: ${appearFromRight} 0.4s;
				}
			}

			ul {
				margin-top: 64px;
                margin-right: 25px;
				width: 100%;
				text-align: left;
				display: flex;
				flex-direction: column;

				a {
					color: white;
					padding: 16px 20px;
					border-radius: 8px 0 0 8px;

					display: flex;
					align-items: center;
					gap: 16px;

					transition: background 0.3s;
					&:hover {
						background: var(--shadow-black-color);

						svg path {
							color: var(--third-color);
						}
					}

					p {
						animation: ${appearFromRight} 0.4s;
                        color: white
					}

					svg {
						width: 20px;
						height: 20px;
					}
				}
			}
		}

		/* Icones que pode não ser tão principais no app */
		div {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;

			ul {
				margin-bottom: 16px;
                margin-right: 25px
				text-align: left;
				width: 100%;
				display: flex;
				flex-direction: column;

				a {
					padding: 16px 20px;
					display: flex;
					align-items: center;
					color: #white;
					gap: 16px;

					transition: color 0.3s;
					&:hover {
						svg path {
							color: var(--third-color);
						}
					}
					svg {
						width: 20px;
						height: 20px;
					}

					p {
						animation: ${appearFromRight} 0.4s;
                        color: white;
					}
				}
			}

			span {
				padding: 16px 0;
                padding-left: 50px;
				border-radius: 8px 8px 0 0;

				background: #2694E3;
				width: 100%;

				display: flex;
				align-items: center;
				gap: 12px;

				p {
					text-overflow: ellipsis;
					color: white;
					width: 70%;
					padding-right: 12px;
					white-space: nowrap;
					animation: ${appearFromRight} 0.4s;
					overflow: hidden;
				}

				img {
					margin-left: 14px;
					width: 32px;
					height: 32px;
					border-radius: 50%;
				}
			}
		}
	}

	aside {
		width: 100%;
		height: 100%;
	}
`;
