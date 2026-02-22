import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servers/$serverId")({
	component: ServerPage,
});

function ServerPage() {
	const { serverId } = Route.useParams();
	return (
		<div className="p-2">
			<h3>Server {serverId}</h3>
		</div>
	);
}
