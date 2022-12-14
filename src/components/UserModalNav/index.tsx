import { useRef, useState } from 'react';
import { AiOutlineGlobal, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';

import { useOnClickOutside } from '../../hooks';
import {
	StyledContainer,
	StyledLinkContainer,
	StyledButton,
	StyledLoginButton,
} from './style';
import { UserSettings } from '../';

const UserModalNav = () => {
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const ref = useRef(null);
	useOnClickOutside(ref, () => setIsUserModalOpen(false));

	return (
		<StyledContainer ref={ref}>
			<StyledLinkContainer>
				<StyledButton>Become A Host</StyledButton>
				<StyledButton>
					<AiOutlineGlobal />
				</StyledButton>
			</StyledLinkContainer>

			<StyledLoginButton onClick={() => setIsUserModalOpen(!isUserModalOpen)}>
				<AiOutlineMenu />
				<AiOutlineUser />
			</StyledLoginButton>
			{isUserModalOpen && <UserSettings />}
		</StyledContainer>
	);
};

export default UserModalNav;
