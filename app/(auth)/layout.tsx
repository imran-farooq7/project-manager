import "@/app/globals.css";
import GlassPane from "@/components/GlassPane";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: ["300", "500", "700"],
	subsets: ["devanagari"],
});
export default function AuthRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body
				className={`h-screen w-screen rainbow-mesh p-6 ${poppins.className}`}
			>
				<GlassPane className="w-full h-full flex items-center justify-center">
					{children}
				</GlassPane>
			</body>
		</html>
	);
}
