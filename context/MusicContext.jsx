import { createContext, useState, useEffect, useContext } from "react";

const MusicContext = createContext();
const songs = [
  {
    id: 1,
    title: "Surah Qaf",
    artist: "Ibrahim Abdella",
    url: "/src/songs/Heart-Touching Quran Recitation by Qari Ibrahim Abdella  Surah Qaf 🥰🇪🇹🇪🇹🇪🇹 - Noon  Quran ن القرآن.mp3",
    duration: "3:00",
  },
  {
    id: 2,
    title: "SurahFurqan",
    artist: "IbrahimIdris",
    url: "/src/songs/SurahFurqan(Full Surah)QariIbrahimIdrisEnglishTranslation-IbrahimIdris.mp3",
    duration: "20:20",
  },
  {
    id: 3,
    title: "SurahAn-Naba",
    artist: "AbdulRahmanMossad",
    url: "/src/songs/SurahAn-NababyAbdulRahmanMossad-Abdulrahmanmossad عبدالرحممسعد.mp3",
    duration: "5:24",
  },
  {
    id: 4,
    title: "SurahAl-Baqarah",
    artist: "Dr.MisbahSani",
    url: "/src/songs/SurahAl-BaqarahFullRecitationPowerfulProtection&Blessings,Qari.DRMisbahsani-Dr.MisbahSani.mp3",
    duration: "10:42",
  },
  {
    id: 5,
    title: "QuranRecitationmoon",
    artist: "NewBeautiful",
    url: "/src/songs/NewBeautifulQuranRecitation.mp3",
    duration: "13:10",
  },
  {
    id: 6,
    title: "SurahAl-Ahzabسورة الأحزاب ",
    artist: "omarHisham",
    url: "/src/songs/SurahAl-Ahzabسورة الأحزاب (Pure Tranquility) Omar Hishaعم هشام العربي(formerly New style)-OmarHishamAlArabi.mp3",
    duration: "23:26",
  },
  {
    id: 7,
    title: "SurahMaryam",
    artist: "omarHisham",
    url: "/src/songs/SurahMaryam(Be Heave مريمOmarHishamAlArabi-OmarHishamAlArabi.mp3",
    duration: "19:00",
  },
  {
    id: 8,
    title: "سورة لقمانOmarHisham-OmarHishamAlArabi",
    artist: "omarHisham",
    url: "/src/songs/SurahLuqman(Tranquility)سورة لقمانOmarHisham-OmarHishamAlArabi.mp3",
    duration: "12:19",
  },
];
export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlayerPlaylists");
    if (savedPlaylists) {
      const playlists = JSON.parse(savedPlaylists);
      setPlaylists(playlists);
    }
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
    } else {
      localStorage.removeItem("musicPlayerPlaylists");
    }
  }, [playlists]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrackIndex,
        currentTrack,
        setCurrentTime,
        currentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        createPlaylist,
        playlists,
        addSongToPlaylist,
        setCurrentTrack,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used inside of MusicProvider");
  }

  return contextValue;
};
