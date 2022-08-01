import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectLocation } from '../features/Room/roomSlice';

const Categories = () => {
	const { locationList } = useAppSelector((store) => store.location);
	const dispatch = useAppDispatch();

	return (
		<Container
			spaceBetween={10}
			slidesPerView={8}
			navigation={true}
			modules={[Navigation]}>
			{locationList.map((location) => {
				const { _id, image, province } = location;

				return (
					<SwiperSlide key={_id} onClick={() => dispatch(selectLocation(_id))}>
						<Item>
							<div>
								<img src={image} alt={province} />
							</div>
							<h5>{province}</h5>
						</Item>
					</SwiperSlide>
				);
			})}
		</Container>
	);
};

const Container = styled(Swiper)`
	width: 100%;

	.swiper-button-next,
	.swiper-button-prev {
		top: 35%;
		color: black;
	}
`;

const Item = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 12.5rem;
	text-align: center;
	cursor: pointer;

	img {
		border-radius: var(--radius);
		height: 10rem;
	}
`;

export default Categories;