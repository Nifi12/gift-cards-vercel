import type { Dispatch, FC } from 'react'

import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'

import { convertSentence } from '@constants/index'
import type { FavouriteAction, FavouriteInitialStateInter } from '@reducers/FavouriteReducer'
import type { GiftCardAction, GiftCardInStateInter } from '@reducers/index'
import { Navigation, Virtual } from 'swiper/modules'

import { Icons } from '..'
import { StyledSwiper, StyledSwiperSlide, SwiperArrow, SwiperWrapper } from './Carousel.styles'

import './Carousel.css'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react';
interface CarouselProps {
	dispatch: Dispatch<GiftCardAction> | Dispatch<FavouriteAction> | null
	state: GiftCardInStateInter | FavouriteInitialStateInter | null
}

export const Carousel: FC<CarouselProps> = ({ state, dispatch }) => {
	const carouselBreakpoints = {
		0: {
			slidesPerGroup: 1,
			slidesPerView: 1,
		},
		1400: {
			slidesPerGroup: 3,
			slidesPerView: 9,
			spaceBetween: 40,
		},
		576: {
			slidesPerGroup: 3,
			slidesPerView: 3,
			spaceBetween: 20,
		},
		768: {
			slidesPerGroup: 3,
			slidesPerView: 4,
			spaceBetween: 30,
		},
		992: {
			slidesPerGroup: 3,
			slidesPerView: 6,
			spaceBetween: 40,
		},
	}

	const categories = [
		'all',
		'auto',
		'books',
		'clothes',
		'cosmetics',
		'entertainment',
		'food_and_drink',
		'games',
		'home_and_appliances',
		'jewelry_and_bijouterie',
		'tv',
	]

	const CarouselSharedStyle = {
		border: '1px solid white',
		borderRadius: '50%',
		height: '1.3rem',
		padding: '0.4rem',
		width: '1.3rem',
	}

	const handleClick = (cat: string) => {
		if (dispatch) {
			if (cat === 'all') {
				dispatch({
					type: 'RESET',
					payload: { categoryName: cat },
				})
			} else {
				dispatch({ type: 'FILTER_DATA_CATEGORY', payload: { categoryName: cat } })
			}
		}
	}

	return (
		<SwiperWrapper>
			<Swiper
				breakpoints={carouselBreakpoints}
				modules={[Navigation, Virtual]}
				direction='horizontal'
				navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
				className='swipe'
			>
				{categories.map((cat: string, idx: number) => (
					<StyledSwiperSlide
						className={state?.category === cat ? 'selected' : ''}
						key={`${cat}-${idx}`}
						virtualIndex={idx}
						onClick={() => handleClick(cat)}
					>
						<Icons carousel={true} category={cat} sharedStyle={CarouselSharedStyle} />
						{convertSentence(cat)}
					</StyledSwiperSlide>
				))}
				<SwiperArrow className="swiper-prev">
					<FiArrowLeftCircle style={{ width: '2rem', height: '2rem' }} />
				</SwiperArrow>
				<SwiperArrow className="swiper-next">
					<FiArrowRightCircle style={{ width: '2rem', height: '2rem' }} />
				</SwiperArrow>
			</Swiper>
		</SwiperWrapper>
	)
}
