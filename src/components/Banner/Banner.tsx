import { modalState, movieState } from "@/atoms/modalAtom";
import { BANNER_INFO_BUTTON, BANNER_PLAY_BUTTON, baseUrl } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Movie } from "@/typings";

interface Props {
	netflixOriginals: Movie[];
}

export function Banner({ netflixOriginals }: Props) {
	const [movie, setMovie] = useState<Movie | null>(netflixOriginals[0]);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	useEffect(() => {
		setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
	}, [netflixOriginals]);

	return (
		<div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 ">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					alt={"banner-image"}
				/>
			</div>

			<h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">{movie?.title || movie?.name || movie?.original_name}</h1>
			<p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">{movie?.overview}</p>

			<div className="flex space-x-3">
				<button className="bannerButton bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					{BANNER_PLAY_BUTTON}
				</button>
				<button
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
					className="bannerButton bg-[gray]/70"
				>
					{BANNER_INFO_BUTTON} <HiOutlineInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
				</button>
			</div>
		</div>
	);
}
