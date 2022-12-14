import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from '../../components';

const StyledContainer = styled.section`
	width: 100%;
`;

const StyledNavbar = styled.nav`
	background-color: white;
	height: 6.5rem;
	padding: 2rem 1rem;
	border-bottom: 1px solid rgb(235, 235, 235) !important;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledLocationTitle = styled.h3``;

const StyledLinkContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledTitleContainer = styled.div`
	@media only screen and (max-width: 992px) {
		padding-inline: var(--padding-inline-small-device);
	}
`;

const StyledCatalogContainer = styled.div`
	margin-bottom: 1.5rem;
	height: 32rem;
`;

const StyledHeading = styled.h5<{ isLoading?: boolean }>`
	font-size: 1.5rem;
	border-bottom: ${(props) => (props.isLoading ? '0' : '1px solid black')};
	font-weight: 450;
`;

const StyledSubTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledSubTitleLink = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	color: black;
	font-size: 1.5rem;
	margin-inline: 1rem;
	place-items: center;
	transition: var(--transition);
	padding: 0.5rem;
	border-radius: var(--radius);

	:hover {
		background-color: #f7f7f7;
	}
`;

const StyledSubTitleLinkSpan = styled.span`
	margin-left: 0.5rem;
	border-bottom: 1px solid black;
`;

const StyledPhotoContainer = styled.div`
	margin: 2rem auto;
	display: grid;
	grid-gap: 0.75rem;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 20rem);

	grid-template-areas:
		'main main image-1 image-2'
		'main main image-3 image-4';
`;

const StyledImage = styled(Image)``;

const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgb(34, 34, 34) !important;
	font-size: 2rem;

	svg {
		font-size: 2rem;
	}
`;

const StyledBackHomeButton = styled(Link)`
	font-size: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	color: rgb(34, 34, 34) !important;
	font-weight: 600;
`;

const StyledDivWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

const StyledSkeletonLoadingWrapper = styled.div<{
	width?: string;
	gridArea?: string;
}>`
	width: ${(props) => (props.width ? props.width : '100%')};
	grid-area: ${(props) => props.gridArea};
`;

export {
	StyledNavbar,
	StyledLocationTitle,
	StyledContainer,
	StyledTitleContainer,
	StyledLinkContainer,
	StyledHeading,
	StyledSubTitle,
	StyledCatalogContainer,
	StyledSubTitleLink,
	StyledSubTitleLinkSpan,
	StyledPhotoContainer,
	StyledImage,
	StyledButton,
	StyledBackHomeButton,
	StyledDivWrapper,
	StyledSkeletonLoadingWrapper,
};
