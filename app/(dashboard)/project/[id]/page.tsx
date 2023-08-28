import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id: string) => {
	const user = await getUserFromCookie(cookies());
	const project = await prisma.project.findFirst({
		where: {
			id,
			ownerId: user?.id,
		},
		include: {
			tasks: true,
		},
	});
	return project;
};
const ProjectDetails = async ({ params }: { params: { id: string } }) => {
	const project = await getData(params.id);
	return (
		<div className="h-full overflow-y-auto pr-6 w-1/1">
			<TaskCard tasks={project?.tasks} title={project?.name} />
		</div>
	);
};
export default ProjectDetails;
