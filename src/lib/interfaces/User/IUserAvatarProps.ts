import { WithClassName } from "@/lib/types/ClassNameOnlyProps";

interface IUserAvatarOwnProps {
  avatarName: string;
  avatarUrl: string;
}

type IUserAvatarProps = WithClassName<IUserAvatarOwnProps>;

export default IUserAvatarProps;