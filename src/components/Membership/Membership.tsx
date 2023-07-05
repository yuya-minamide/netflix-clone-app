import { ACCOUNT_INFORMATION_CONTENTS, ACCOUNT_TITLE, CHANGE_INFORMATION_CONTENTS, PASSWORD } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader } from "../index";
import { goToBillingPortal } from "../../lib/stripe";
import { useState } from "react";

export function Membership() {
	const { user } = useAuth();
	const subscription = useSubscription(user);
	const [isBillingLoading, setBillingLoading] = useState(false);

	const manageSubscription = () => {
		if (subscription) {
			setBillingLoading(true);
			goToBillingPortal();
		}
	};

	return (
		<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
			<div className="space-y-2 py-4">
				<h4 className="text-lg text-[gray]">{ACCOUNT_TITLE}</h4>
				<button
					disabled={isBillingLoading || !subscription}
					className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5 pointer"
					onClick={manageSubscription}
				>
					{isBillingLoading ? <Loader color="dark:fill-[#e50914]" /> : "Cancel Membership"}
				</button>
			</div>

			<div className="col-span-3">
				<div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
					<div>
						<p className="font-medium">{user?.email}</p>
						<p className="text-[gray]">{PASSWORD}</p>
					</div>
					<div className="md:text-right">
						{CHANGE_INFORMATION_CONTENTS.map((content, idx) => (
							<p className="membershipLink" key={idx}>
								{content}
							</p>
						))}
					</div>
				</div>

				<div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
					<div>
						<p>
							{subscription?.cancel_at_period_end ? "Your membership will end on " : "Your next billing date is "}
							{subscription?.current_period_end}
						</p>
					</div>
					<div className="md:text-right">
						{ACCOUNT_INFORMATION_CONTENTS.map((content, idx) => (
							<p className="membershipLink" key={idx}>
								{content}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
