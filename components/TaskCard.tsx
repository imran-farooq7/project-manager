import { title } from "process";
import Button from "./Button";
import Card from "./Card";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

type Props = {
	title?: string;
	tasks?: any;
};
const getData = async () => {
	const user = await getUserFromCookie(cookies());
	const tasks = await prisma.task.findMany({
		where: {
			ownerId: user?.id,
			NOT: {
				status: TASK_STATUS.COMPLETED,
				deleted: false,
			},
		},
		orderBy: {
			due: "asc",
		},
		take: 5,
	});

	return tasks;
};
const TaskCard = async ({ title, tasks }: Props) => {
	const data = tasks || (await getData());
	return (
		<Card className="">
			<div className="flex justify-between items-center">
				<div>
					<span className="text-3xl text-gray-600">{title}</span>
				</div>
				<div>
					<Button type="button" intent="text" className="text-violet-600">
						+ Create New
					</Button>
				</div>
			</div>
			<div>
				{data && data.length ? (
					<div>
						{data.map((task: any) => (
							<div className="py-2 ">
								<div>
									<span className="text-gray-800">{task.name}</span>
								</div>
								<div>
									<span className="text-gray-400 text-sm">
										{task.description}
									</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<div>no tasks</div>
				)}
			</div>
		</Card>
	);
};
export default TaskCard;
