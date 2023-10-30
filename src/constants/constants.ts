/* eslint-disable no-magic-numbers */
import type { Dispatch, SetStateAction } from 'react'

import TwitchLogo from '@assets/cardPlaceholder.jpg'
import Logo from '@assets/team_logo.png'
import type {
	AdminChooseIdAction,
	CheckoutAction,
	CheckoutReducerInitStateInter,
	ItemAction,
} from '@reducers/index'

import type {
	CheckoutDataInter,
	CombinedFormValueInterfaces,
	GiftCardInter,
	TextObject,
	UserInter,
} from '../@types/giftcards'

export const API: string = 'https://json-db-gift-cards-mock-versel.vercel.app'
export const CLIENT_ID: string = import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID as string

export const LogoPic = Logo
export const CardPlaceHolder = TwitchLogo

const timeout = 500

interface HandleAlertShowFunction {
	(values: CombinedFormValueInterfaces, setSubmitting: (isSubmitting: boolean) => void): void
}

export const handleShowWarning = (
	setModalShow: Dispatch<SetStateAction<boolean>> | null,
	selectedID?: string | number,
	changeIdDispatch?: Dispatch<AdminChooseIdAction> | null
) => {
	if (setModalShow) {
		setModalShow(true)
	}
	if (changeIdDispatch) {
		changeIdDispatch({
			type: 'CHANGE_SELECTED_ID',
			payload: {
				selectedID,
			},
		})
	}
}

export const handleAlertShow: HandleAlertShowFunction = (values, setSubmitting) => {
	setTimeout(() => {
		alert(JSON.stringify(values))
		setSubmitting(false)
	}, timeout)
}

export const handleMouseMovement = (
	visible: boolean,
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
): void => {
	setVisible(!visible)
}

export const updateCheckoutList = (
	data: CheckoutDataInter[],
	payload: CheckoutDataInter
): CheckoutDataInter[] => {
	const oldData = [...data]
	const updateItemName = payload.name

	const shouldUpdate = oldData.some((item: CheckoutDataInter) => item.name === updateItemName)

	let newData: CheckoutDataInter[] = [...oldData, payload]

	if (shouldUpdate) {
		let updateIdx = 0

		data.forEach((gift: CheckoutDataInter, idx: number) => {
			if (gift.name === updateItemName) {
				updateIdx = idx
			}
		})

		const dataFirstHalf = oldData.splice(0, updateIdx + 1)

		const updateItem: CheckoutDataInter | undefined = dataFirstHalf.pop()

		if (updateItem) {
			const newItem: CheckoutDataInter = { ...updateItem, amount: updateItem.amount + 1 }

			newData = [...dataFirstHalf, newItem, ...oldData]
		}
	}

	return newData
}

export const handleAddItemClick = (
	item: CheckoutDataInter | null | undefined,
	CheckoutDispatch: Dispatch<CheckoutAction> | null,
	checkoutState: CheckoutReducerInitStateInter | null,
	setModalState?: Dispatch<SetStateAction<boolean>> | null,
	user?: UserInter | null
): void => {
	if (CheckoutDispatch && item && user) {
		CheckoutDispatch({ type: 'ADD_DATA', payload: { data: item } })

		if (checkoutState) {
			const newItems = updateCheckoutList(checkoutState.data, item)

			localStorage.setItem('checkout', JSON.stringify(newItems))
		}

		if (setModalState) {
			setModalState(false)
		}
	}
}

export const handleRemoveClick = (
	gift: CheckoutDataInter,
	checkoutDispatch: Dispatch<CheckoutAction> | null,
	checkoutState: CheckoutReducerInitStateInter | null
) => {
	if (checkoutDispatch) {
		checkoutDispatch({ type: 'REMOVE_DATA', payload: { data: gift } })

		if (checkoutState) {
			const newItems = [...checkoutState.data].filter((oldGift) => oldGift.name !== gift.name)

			localStorage.setItem('checkout', JSON.stringify(newItems))
		}
	}
}

export const handleModalClose = (
	setModalState: Dispatch<SetStateAction<boolean>> | null | undefined
) => {
	if (setModalState) {
		setModalState(false)
	}
}

export const handleImgClick = (card: GiftCardInter, dispatch: Dispatch<ItemAction> | null) => {
	if (dispatch) {
		dispatch({ type: 'LOAD_DATA', payload: { data: card, category: card.categoryID } })
	}
}

export const convertSentence = (string: string | number) => {
	if (typeof string !== 'number') {
		const firstIdx = 0
		const secondIdx = 1

		const newSentence: string = string
			.toLocaleLowerCase()
			.split('_')
			.map((word) => `${word.slice(firstIdx, secondIdx).toUpperCase()}${word.slice(secondIdx)}`)
			.join(' ')

		return newSentence
	}
	return string
}

export const stringToLowerCase = (string: string): string => {
	return string.toLowerCase()
}

export const stringToArray = (func: string, separator: string): string[] => {
	const regex = /[-’/`~!#*$@_%+=.,^&{}[\]|;:”<>?\\]/g

	const newString = func.replace(regex, '_')

	return newString.split(separator).filter((word: string) => word !== '')
}

export const combineStringConverter = (
	func1: (arg: string) => string,
	func2: (arg1: string, arg2: string) => string[],
	data: string,
	separator: string,
	combiner: string
): string => {
	return func2(func1(data), separator).join(combiner)
}

export const getAmount = (data: CheckoutDataInter[]): number => {
	const calculatedAmount = data.reduce(
		(acc: number, gift: CheckoutDataInter) => acc + gift.amount,
		0
	)
	return calculatedAmount
}

export const mockData: GiftCardInter[] = [
	{
		id: '1',
		name: 'WOG Cafe',
		backgroundImg: '',
		cardImg: '',
		price: 10,
		region: 'uk',
		regionFlag: '🇺🇦',
		attentionMessage: '',
		categoryID: 'auto',
		shortDesc: 'WOG Cafe gift card',
		description:
			'WOG Cafe is a restaurant chain that takes care of the mood and diet of its visitors. The first restaurant was founded in 2015, and today there are more than 30 of them throughout the country. Aromatic coffee, democratic burgers and gourmet dishes from different cuisines of the world will appeal to everyone. 500 UAH gift card',
	},
	{
		id: '1',
		name: 'Yakaboo',
		backgroundImg: '',
		cardImg: '',
		categoryID: 'books',
		region: 'uk',
		regionFlag: '🇺🇦',
		price: 10,
		attentionMessage: '',
		shortDesc: 'Gift card Yakaboo',
		description:
			'Yakaboo is the largest online bookstore in Ukraine. It is an online organisation that is a large-scale book ecosystem that works with most of the publishing houses in Ukraine. It delivers not only in Kyiv but also to other regions of Ukraine. UAH 500 gift card.',
	},
	{
		id: '1',
		name: 'Ukrzoloto',
		backgroundImg: '',
		cardImg: '',
		price: 10,
		region: 'uk',
		regionFlag: '🇺🇦',
		attentionMessage: '',
		categoryID: 'jewelry_and_bijouterie',
		shortDesc: 'Ukrzoloto gift card',
		description:
			'Ukrzoloto is a network of more than 100 outlets where jewelry is presented both under its own brand and from the best manufacturers of Ukraine. Jewelry stores provide a wide selection of jewelry and accessories made of precious metals. 500 UAH gift card.',
	},
	{
		id: '2',
		name: 'Rozetka',
		backgroundImg: '',
		cardImg: '',
		price: 10,
		region: 'uk',
		regionFlag: '🇺🇦',
		attentionMessage: '',
		categoryID: 'something',
		shortDesc: 'Подарункова карта у мережу магазинів Rozetka',
		description:
			'ROZETKA is the largest online retailer in the country. Here you can find anything and everything for every taste: from chewing gum to TV. 500 UAH gift card.',
	},
	{
		id: '2',
		name: 'Steam',
		backgroundImg: '',
		cardImg: '',
		region: 'eu',
		regionFlag: '🇪🇺',
		price: 16,
		categoryID: 'games',
		attentionMessage: '',
		shortDesc: 'Steam gift card',
		description:
			"Steam is a service of Valve, a well-known video game developer that provides digital distribution, multiplayer gaming and player communication services. Steam is also used to receive automatic updates and news for both Valve's and third-party products. In addition to video games, the service offers tools for game developers, music, films and gaming equipment..",
	},
	{
		id: '1',
		name: 'TOMMY HILFIGER',
		backgroundImg: '',
		cardImg: '',
		price: 10,
		region: 'uk',
		regionFlag: '🇺🇦',
		attentionMessage: '',
		categoryID: 'clothes',
		shortDesc: 'Tommy Hilfiger gift card',
		description:
			'The Tommy Hilfiger trademark successfully combines classic and everyday in their clothing and footwear models, while always focusing on current trends. Products for adults and children are always an impeccable quality brand with a worldwide reputation. When ordering a trademark certificate, you will receive a card from MD Fashion, the exclusive representative in Ukraine. 500 UAH gift card',
	},
]

export const coinText: TextObject[] = [
	{
		h2: 'What is it?',
		text: 'These coins are a digital alternative to regular bonus points or simple virtual points. Coins can be used to order various interesting things on the site, such as e-books, games, various courses or gift cards or discounts.',
	},
	{
		h2: 'How to use it?',
		text: [
			'For some special event in your life, you will be credited with a certain amount of coins, which you can spend on this site, choosing what you like. It is not necessary to spend them right away, you can save up and choose more expensive gifts for yourself.',
			`To begin with, you need to log in under nixs by mail, then you will see your balance of coins and what you got them for in your personal account. After choosing your gift, click "Choose this gift" and your balance will be smaller. If there are questions - you will be contacted in private messages for clarification.`,
			`You will receive a gift - enjoy it.`,
		],
	},
	{
		h2: 'What can you get coins for?',
		text: [
			'Coins can be obtained for various important dates or merits. For example:',
			'- for the birthday (10 coins);',
			'- work anniversary (3 years - 3 coins, 5 years - 5 coins, 10 years - 10 coins, 15 years - 15 coins, 20 years - 20 coins);',
			'- wedding (5 coins);',
			'- birth of a child (5 coins);',
			'- for the creation and conduct of lectures in the department (3 coins);',
			"- participation and development of R'n'D projects (5 coins);",
			'- or for completing tasks related to obtaining certification (5 coins).',
		],
	},
	{
		h2: 'Gift coins',
		text: `Not only can you choose gift cards with the "coins" you earn, but you can also pass them on to a colleague in our department. To do this you need to go here, write your colleague's nixs email address and specify the number of coins. The recipient will receive a notification.`,
	},
]

export const headerAdminGifts = [
	{
		link: '=name',
		name: 'Name:',
	},
	{
		link: '=categoryID',
		name: 'Category:',
	},
	{
		link: '=region',
		name: 'Region:',
	},
	{
		link: '=price',
		name: 'Price:',
	},
]

export const mockElement: GiftCardInter = mockData[4]

export const basicNumber = 0

export const userDetailsList = [
	{ link: 'info-of-user', name: 'Info' },
	{ link: 'add-coins', name: 'Add coins' },
	{ link: 'history-of-purpose', name: 'History of purpose' },
	{ link: 'history-of-previous-trans', name: 'History of previous transactions' },
	{ link: 'history-of-suggestions', name: 'History of suggestions' },
]
export const categories = [
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
