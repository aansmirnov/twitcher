import { Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

type UserInfoNameProps = {
    userName: string;
    isMod: boolean;
    isVip: boolean;
    amICurrentUser: boolean;
    userColor: string;
    ml: string;
    onClickMod: VoidFunction;
    onClickVip: VoidFunction;
}

export const UserInfoName = ({ userName, isMod, isVip, amICurrentUser, userColor, ml, onClickMod, onClickVip }: UserInfoNameProps) => {
    if (amICurrentUser) {
        return (
            <Text ml={ml} color={userColor}>{userName}</Text>
        );
    }

    return (
        <Menu>
            <MenuButton ml={ml} color={userColor}>
                {userName}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={onClickMod}>{isMod ? 'Unmod' : 'Mod'} {userName}</MenuItem>
                <MenuItem onClick={onClickVip}>{isVip ? 'Unvip' : 'Vip'} {userName}</MenuItem>
            </MenuList>
        </Menu>
    );
};