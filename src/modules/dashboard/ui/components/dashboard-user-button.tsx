import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardUserButton = () => {
  const isMobile = useIsMobile()
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  // Name se initials generate karo
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Random background color generate karo name ke basis pe
  const getAvatarColor = (name: string | undefined) => {
    if (!name) return "bg-blue-500";
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Mobile ke liye drawer return karo
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="ghost" 
            className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden h-auto"
          >
            <Avatar className="size-9 mr-3 flex-shrink-0">
              {data.user.image && data.user.image !== "null" ? (
                <AvatarImage
                  src={data.user.image}
                  alt={data.user.name || "User"}
                  onError={(e) => {
                    // Agar image load nahi hui to fallback show karo
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : null}
              <AvatarFallback
                className={`${getAvatarColor(
                  data.user.name
                )} text-white font-semibold`}
              >
                {getInitials(data.user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
              <p className="text-sm truncate w-full">{data.user.name}</p>
              <p className="text-xs truncate w-full text-muted-foreground">{data.user.email}</p>
            </div>
            <ChevronDownIcon className="flex-shrink-0 ml-2" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="text-left px-0">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="size-12">
                {data.user.image && data.user.image !== "null" ? (
                  <AvatarImage
                    src={data.user.image}
                    alt={data.user.name || "User"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <AvatarFallback
                  className={`${getAvatarColor(
                    data.user.name
                  )} text-white font-semibold`}
                >
                  {getInitials(data.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 overflow-hidden flex-1 min-w-0">
                <DrawerTitle className="text-base font-medium truncate">
                  {data.user.name}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground truncate">
                  {data.user.email}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          
          <div className="flex flex-col gap-2 mb-4">
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 h-auto"
              onClick={() => {
                // Billing logic yahan add karo
              }}
            >
              <CreditCardIcon className="size-4 mr-3" />
              Billing
            </Button>
          </div>
          
          <DrawerFooter className="px-0 pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full"
              onClick={onLogout}
            >
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop ke liye dropdown menu return karo
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        <Avatar className="size-9 mr-3 flex-shrink-0">
          {data.user.image && data.user.image !== "null" ? (
            <AvatarImage
              src={data.user.image}
              alt={data.user.name || "User"}
              onError={(e) => {
                // Agar image load nahi hui to fallback show karo
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : null}
          <AvatarFallback
            className={`${getAvatarColor(
              data.user.name
            )} text-white font-semibold`}
          >
            {getInitials(data.user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full text-muted-foreground">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="flex-shrink-0 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex-col flex gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};