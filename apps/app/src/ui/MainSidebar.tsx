import { Link } from '@tanstack/react-router';
import { House, Server } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ServerPicker } from '@/ui/ServerPicker';

const servers = [
	{ id: 1, name: 'Server 1', logo: Server },
	{ id: 2, name: 'Server 2', logo: Server },
	{ id: 3, name: 'Server 3', logo: Server },
];

export default function MainSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<ServerPicker servers={servers} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							{/* TODO: populate with actualy channel and folder list */}
							<Link to="/">
								<House className="size-4" />
								<span>Home</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
