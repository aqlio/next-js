import IUserAvatarProps from "@/lib/interfaces/User/IUserAvatarProps";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";



export default function UserAvatar({ avatarName, avatarUrl, className }: IUserAvatarProps) {
    return (
        <Avatar className={clsx("h-8 w-8", className)}>
            <AvatarImage src={avatarUrl} alt={avatarName} />
            <AvatarFallback>{avatarName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
    )
}