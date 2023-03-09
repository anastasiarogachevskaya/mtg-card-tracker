import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { SingleCardProps } from '../../types/Card/SingleCardProps';

import Checkbox from '../../elements/Form/Checkbox';

import {
	StyledDarkBg,
	StyledCentered,
	StyledModal,
	StyledModalHeader,
	StyledHeading,
	StyledCloseButton,
	StyledContent,
	StyledActions,
	StyledActionsContainer,
	StyledAddButton,
	StyledCancelButton,
	StyledLabel,
	StyledCheckboxWrapper,
} from './ModalParts';

type ModalProps = {
	cardInfo: SingleCardProps;
	decks: { deck: string; _id: string }[];
	setIsOpen: (e: boolean) => void;
};

const Modal = ({ setIsOpen, decks, cardInfo }: ModalProps) => {
	const [checked, setChecked] = useState(false);
	const initialArray: any[] | (() => any[]) = [];
	const [decksToUpdate, setDecksToUpdate] = useState(initialArray);

	const handleCheckboxChange = (event: {
		target: {
			checked: boolean | ((prevState: boolean) => boolean);
			value: React.SetStateAction<string>;
		};
	}) => {
		setChecked(event.target.checked);
		if (event.target.checked === true) {
			if (
				decksToUpdate.find(
					(element: React.SetStateAction<string>) =>
						element === event.target.value
				)
			) {
				return;
			} else {
				setDecksToUpdate((prevArray: any) => [
					...prevArray,
					event.target.value,
				]);
			}
		} else {
			decksToUpdate.splice(decksToUpdate.indexOf(event.target.value), 1);
		}
	};

	console.log(decksToUpdate);
	return (
		<>
			<StyledDarkBg />
			<StyledCentered>
				<StyledModal>
					<StyledModalHeader>
						<StyledHeading>Add {cardInfo.name}</StyledHeading>
					</StyledModalHeader>
					<StyledCloseButton onClick={() => setIsOpen(false)}>
						<RiCloseLine style={{ marginBottom: '-3px' }} />
					</StyledCloseButton>
					<StyledContent>Pick a deck:</StyledContent>
					<StyledCheckboxWrapper>
						{decks.map(({ _id: deckId, deck: deckName }, index) => {
							return (
								<StyledLabel key={deckId} htmlFor={deckId}>
									{/* <Checkbox
                  value={deckId}
                  // checked={checked}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                /> */}
									<input
										type='checkbox'
										id={deckId}
										value={deckId}
										onChange={handleCheckboxChange}
									/>
									<span style={{ marginLeft: 8 }}>{deckName}</span>
								</StyledLabel>
							);
						})}
					</StyledCheckboxWrapper>
					<StyledActions>
						<StyledActionsContainer>
							<StyledAddButton onClick={() => setIsOpen(false)}>
								Add
							</StyledAddButton>
							<StyledCancelButton onClick={() => setIsOpen(false)}>
								Cancel
							</StyledCancelButton>
						</StyledActionsContainer>
					</StyledActions>
				</StyledModal>
			</StyledCentered>
		</>
	);
};

export default Modal;
