import styled from 'styled-components';

interface Props {
	fullWidth?: boolean;
	bgColor?: string;
}

const StyledContainer = styled.button<Props>`
	width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
	position: relative;
	color: white;
	font-size: 2rem;
	border-radius: 7px;
	padding: 1.5rem;
	background: ${(props) =>
		props.bgColor ? props.bgColor : 'var(--clr-gradient)'};
	transition: var(--transition);

	::after {
		content: '';
		border-radius: var(--radius);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: var(--clr-radial);
		opacity: 0;
		transition: var(--transition);
	}

	:hover {
		::after {
			opacity: 1;
		}
	}
`;

const StyledHeading = styled.h4`
	color: white;
	position: relative;
	z-index: 10;
	margin: 0;
	cursor: pointer;
`;

export { StyledContainer, StyledHeading };
