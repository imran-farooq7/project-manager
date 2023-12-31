import "@/app/globals.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/SideBar";
import clsx from "clsx";

export default function DashboardRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={clsx("dark")}>
			<body className="h-screen w-screen candy-mesh p-6">
				<GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
					<Sidebar />
					<main className="w-full pl-6 h-full">{children}</main>
				</GlassPane>
				<div id="modal"></div>
			</body>
		</html>
	);
}
