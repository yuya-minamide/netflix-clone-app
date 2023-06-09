import { PLAN_TITLE, SIGN_OUT, SUB_CONTENTS } from "@/constants";
import { CheckIcon } from "@heroicons/react/outline";
import useAuth from "@/hooks/useAuth";
import { Loader, Table } from "../index";
import { loadCheckout } from "@/lib/stripe";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@stripe/firestore-stripe-payments";

interface Props {
	products: Product[];
}

export function Plans({ products }: Props) {
	const { logout, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
	const [isBillingLoading, setBillingLoading] = useState(false);

	const subscribeToPlan = () => {
		if (!user) return;

		loadCheckout(selectedPlan?.prices[0].id!);
		setBillingLoading(true);
	};

	return (
		<div>
			<Head>
				<title>Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="border-b border-white/10 bg-[#141414]">
				<Link href="/">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
						alt="Netflix"
						width={150}
						height={90}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<button className="text-lg font-medium hover:underline" onClick={logout}>
					{SIGN_OUT}
				</button>
			</header>
			<main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
				<h1 className="mb-3 text-3xl font-medium">{PLAN_TITLE}</h1>
				<ul>
					{SUB_CONTENTS.map((content, idx) => (
						<li className="flex items-center gap-x-2 text-lg" key={idx}>
							<CheckIcon className="h-7 w-7 text-[#E50914]" /> {content}
						</li>
					))}
				</ul>

				<div className="mt-4 flex flex-col space-y-4">
					<div className="flex w-full items-center justify-center self-end md:w-3/5">
						{products.map((product) => (
							<div
								key={product.id}
								className={`planBox ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"}`}
								onClick={() => setSelectedPlan(product)}
							>
								{product.name}
							</div>
						))}
					</div>

					<Table products={products} selectedPlan={selectedPlan} />

					<button
						disabled={!selectedPlan || isBillingLoading}
						className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
							isBillingLoading && "opacity-60"
						}`}
						onClick={subscribeToPlan}
					>
						{isBillingLoading ? <Loader color="dark:fill-gray-300" /> : "Subscribe"}
					</button>
				</div>
			</main>
		</div>
	);
}
