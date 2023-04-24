import { Banner, Header, Modal, Row } from "../components/index";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import { Movie } from "../typings";
import requests from "@/utils/requests";
import { modalState } from "@/atoms/modalAtom";
import { useRecoilValue } from "recoil";

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaries: Movie[];
}

export default function Home(props: Props) {
	const { netflixOriginals, actionMovies, comedyMovies, documentaries, horrorMovies, romanceMovies, topRated, trendingNow } = props;
	const { loading } = useAuth();
	const showModal = useRecoilValue(modalState);

	if (loading) return null;

	return (
		<div className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
			<Head>
				<title>Netflix clone app</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Banner netflixOriginals={netflixOriginals} />
				<section className="md:space-y-24">
					{[
						{ title: "Trending Now", movies: trendingNow },
						{ title: "Top Rated", movies: topRated },
						{ title: "Action Thrillers", movies: actionMovies },
						{ title: "Comedies", movies: comedyMovies },
						{ title: "Scary Movies", movies: horrorMovies },
						{ title: "Romance Movies", movies: romanceMovies },
						{ title: "Documentaries", movies: documentaries },
					].map(({ title, movies }) => (
						<Row key={title} title={title} movies={movies} />
					))}
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
}

export const getServerSideProps = async () => {
	const [netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaries] =
		await Promise.all([
			fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
			fetch(requests.fetchTrending).then((res) => res.json()),
			fetch(requests.fetchTopRated).then((res) => res.json()),
			fetch(requests.fetchActionMovies).then((res) => res.json()),
			fetch(requests.fetchComedyMovies).then((res) => res.json()),
			fetch(requests.fetchHorrorMovies).then((res) => res.json()),
			fetch(requests.fetchRomanceMovies).then((res) => res.json()),
			fetch(requests.fetchDocumentaries).then((res) => res.json()),
		]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
		},
	};
};
