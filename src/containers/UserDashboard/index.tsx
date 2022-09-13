/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUserById,
} from '../../features/User/userThunk';
import { Loading, Button } from '../../components';
import { AdminForm } from '../../components';
import { IUser } from '../../@types/User';
import { transformDate } from '../../utils';
import {
	StyledContainer,
	StyledSearchButton,
	StyledSearchContainer,
	StyledSearch,
	StyledTableContainer,
	StyledTable,
	StyledTableHead,
	StyledTableBody,
	StyledTitle,
	StyledItem,
	StyledRow,
	StyledButtonContainer,
	StyledPaginateContainer,
	StyledPrevButton,
	StyledNextButton,
	StyledPageButton,
} from './style';

const USER_PER_PAGE = 10;
const NUMBER_OF_PAGE_BUTTON = Array.from({ length: 5 }, () => 0);

const UserDashboard = () => {
	const [page, setPage] = useState(0);
	const [displayUser, setDisplayUser] = useState<IUser[]>([]);
	const { userList, selectedUser, isLoading } = useAppSelector(
		(store) => store.user
	);
	const [modalTitle, setModalTitle] = useState('User Info');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useAppDispatch();
	const maxPage = Math.floor(userList.length / USER_PER_PAGE);

	const nextPage = () => {
		setPage((oldPage) => {
			const newPage = oldPage + 1;

			if (newPage > maxPage) return 0;
			return newPage;
		});
	};

	const renderNewUser = () => {
		let tempArray = Array.from(
			{ length: USER_PER_PAGE },
			(_, i) => userList[page * USER_PER_PAGE + i]
		);

		tempArray = tempArray.filter((item) => item !== undefined);
		setDisplayUser(tempArray);
	};

	const prevPage = () => {
		setPage((oldPage) => {
			const newPage = oldPage - 1;
			if (newPage < 0) return maxPage;
			return newPage;
		});
	};

	const paginate = (selectedPage: number) => {
		return () => setPage(selectedPage);
	};

	const deleteUser = (id: string) => {
		return () => {
			dispatch(deleteUserById(id));
			dispatch(getAllUsers());
		};
	};

	const showUser = (id: string) => {
		return () => {
			setModalTitle('User Info');
			setIsModalOpen(true);
			dispatch(getUserById(id));
		};
	};

	const updateUser = (id: string) => {
		return () => {
			setModalTitle('Update User');
			setIsModalOpen(true);
			dispatch(getUserById(id));
		};
	};

	useEffect(() => {
		renderNewUser();
	}, [page, userList]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [selectedUser]);

	if (isLoading)
		return (
			<StyledContainer>
				<Loading />
			</StyledContainer>
		);

	return (
		<StyledContainer>
			<AdminForm<IUser>
				title={modalTitle}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				isLoading={isLoading}
				data={selectedUser}
				disableInput={modalTitle === 'Update User' ? false : true}
				dispatchFunction={updateUserById}
			/>
			<Button fullWidth={false}>Add New</Button>
			<StyledSearchContainer>
				<StyledSearch />
				<StyledSearchButton>Search</StyledSearchButton>
			</StyledSearchContainer>
			<StyledTableContainer>
				<StyledTable>
					<StyledTableHead>
						<StyledRow>
							<StyledTitle>Id</StyledTitle>
							<StyledTitle>Name</StyledTitle>
							<StyledTitle>Email</StyledTitle>
							<StyledTitle>Phone</StyledTitle>
							<StyledTitle>Birthday</StyledTitle>
							<StyledTitle>Gender</StyledTitle>
							<StyledTitle>Address</StyledTitle>
							<StyledTitle>Type</StyledTitle>
							<StyledTitle>Actions</StyledTitle>
						</StyledRow>
					</StyledTableHead>
					<StyledTableBody>
						{displayUser.map((item) => {
							const {
								_id,
								name,
								email,
								phone,
								birthday,
								gender,
								address,
								type,
							} = item;
							return (
								<StyledRow key={_id}>
									<StyledItem>{_id}</StyledItem>
									<StyledItem>{name}</StyledItem>
									<StyledItem>{email}</StyledItem>
									<StyledItem>{phone}</StyledItem>
									<StyledItem>{transformDate(new Date(birthday))}</StyledItem>
									<StyledItem>{gender ? 'Male' : 'Female'}</StyledItem>
									<StyledItem>{address}</StyledItem>
									<StyledItem>{type}</StyledItem>
									<StyledItem>
										<StyledButtonContainer>
											<Button onClickHandler={showUser(_id)} bgColor='#28a745'>
												Info
											</Button>
											<Button
												onClickHandler={updateUser(_id)}
												bgColor='#ffc107'>
												Update
											</Button>
											<Button
												onClickHandler={deleteUser(_id)}
												bgColor='#dc3545'>
												Delete
											</Button>
										</StyledButtonContainer>
									</StyledItem>
								</StyledRow>
							);
						})}
					</StyledTableBody>
				</StyledTable>
			</StyledTableContainer>
			<StyledPaginateContainer>
				<StyledPrevButton onClick={prevPage}>Prev</StyledPrevButton>
				<StyledPageButton active={page === 0} onClick={paginate(0)}>
					1
				</StyledPageButton>
				{NUMBER_OF_PAGE_BUTTON.map((_, index) => {
					let tempPage = page + index - 2;

					if (page === 0) {
						tempPage = page + index + 1;
					} else if (page === 1) {
						tempPage = page + index;
					} else if (page === 2) {
						tempPage = page + index - 1;
					}

					if (page === maxPage) {
						tempPage = page + index - 6;
					} else if (page === maxPage - 1) {
						tempPage = page + index - 5;
					} else if (page === maxPage - 2) {
						tempPage = page + index - 4;
					} else if (page === maxPage - 3) {
						tempPage = page + index - 3;
					}
					return (
						<StyledPageButton
							key={index}
							active={page === tempPage}
							onClick={paginate(tempPage)}>
							{tempPage + 1}
						</StyledPageButton>
					);
				})}
				<StyledPageButton active={page === maxPage} onClick={paginate(maxPage)}>
					{maxPage}
				</StyledPageButton>
				<StyledNextButton onClick={nextPage}>Next</StyledNextButton>
			</StyledPaginateContainer>
		</StyledContainer>
	);
};

export default UserDashboard;