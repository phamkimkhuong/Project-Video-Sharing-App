import { NavigationProp, RouteProp } from "@react-navigation/native";

export const PRIMARY_COLOR = "#f44b87";

export const serverURL = "http://192.168.1.8:8081";

export type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};

export const data_avatar = [
  {
    id: "1",
    img: require("../assets/home/Image.png"),
    name: "You",
  },
  {
    id: "2",
    img: require("../assets/home/avatar2.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "Adam",
  },
  {
    id: "3",
    img: require("../assets/home/avatar3.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "William",
  },
  {
    id: "4",
    img: require("../assets/home/avatar4.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "Peter",
  },
  {
    id: "5",
    img: require("../assets/home/avatar5.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "Julia",
  },
  {
    id: "6",
    img: require("../assets/home/avatar5.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "Julia",
  },
  {
    id: "7",
    img: require("../assets/home/avatar5.png"),
    live: require("../assets/home/avarta_smail.png"),
    name: "Julia",
  },
];

export const data_video = [
  {
    id: "1",
    img: require("../assets/home/trending.png"),
  },
  {
    id: "2",
    img: require("../assets/home/trending2.png"),
  },
  {
    id: "3",
    img: require("../assets/home/trending3.png"),
  },
];

export const data_topic = [
  {
    id: "1",
    img: require("../assets/home/topic1.png"),
    name: "Sports",
  },
  {
    id: "2",
    img: require("../assets/home/topic2.png"),
    name: "Podcasts",
  },
  {
    id: "3",
    img: require("../assets/home/topic3.png"),
    name: "News",
  },
  {
    id: "4",
    img: require("../assets/home/topic4.png"),
    name: "Travel",
  },
  {
    id: "5",
    img: require("../assets/home/topic5.png"),
    name: "Health",
  },
  {
    id: "6",
    img: require("../assets/home/topic6.png"),
    name: "Weather",
  },
  {
    id: "7",
    img: require("../assets/home/topic7.png"),
    name: "Art",
  },
  {
    id: "8",
    img: require("../assets/home/topic8.png"),
    name: "Topics",
  },
];
export const data_stream = [
  {
    id: "1",
    name: "Lifestyle",
    img: require("../assets/home/stream.png"),
    avatar: require("../assets/home/stream_avatar.png"),
    play: require("../assets/home/play.png"),
    view: "1.5Mviews",
    btn: "1 min ago",
  },
  {
    id: "2",
    name: "Lifestyle",
    img: require("../assets/home/stream2.png"),
    avatar: require("../assets/home/stream_avatar.png"),
    play: require("../assets/home/play.png"),
    view: "1.5Mviews",
    btn: "1 min ago",
  },
  {
    id: "3",
    name: "Lifestyle",
    img: require("../assets/home/stream3.png"),
    avatar: require("../assets/home/stream_avatar.png"),
    play: require("../assets/home/play.png"),
    view: "1.5Mviews",
    btn: "1 min ago",
  },
];

export const data_audio = [
  {
    id: "1",
    name: "Taste",
    author: "Sabrina Carpenter",
    img: require("../assets/audio/img/audio_img1.jpg"),
    duration: "0:45",
  },
  {
    id: "2",
    name: "Please Please Please",
    author: "Sabrina Carpenter",
    img: require("../assets/audio/img/audio_img2.jpg"),
    duration: "0:15",
  },
  {
    id: "3",
    name: "Love Somebody",
    author: "Morgan Wallen",
    img: require("../assets/audio/img/audio_img3.jpg"),
    duration: "0:30",
  },
  {
    id: "4",
    name: "Timeless",
    author: "The Weeknd & Playboi Carti",
    img: require("../assets/audio/img/audio_img4.jpg"),
    duration: "0:50",
  },
  {
    id: "5",
    name: "Sticky",
    author: "Tyler, The Creator feat. GloRilla, Sexyy Red & Lil Wayne",
    img: require("../assets/audio/img/audio_img5.jpg"),
    duration: "1:00",
  },
  {
    id: "6",
    name: "Good Luck, Babe!",
    author: "Chappell Roan",
    img: require("../assets/audio/img/audio_img6.jpg"),
    duration: "0:30",
  },
  {
    id: "7",
    name: "St. Chroma",
    author: "Tyler, The Creator feat. Daniel Caesar",
    img: require("../assets/audio/img/audio_img7.jpg"),
    duration: "0:20",
  },
  {
    id: "8",
    name: "Die with a Smile",
    author: "Lady Gaga & Bruno Mars",
    img: require("../assets/audio/img/audio_img8.jpg"),
    duration: "0:40",
  },
  {
    id: "9",
    name: "Birds of a Feather",
    author: "Billie Eilish",
    img: require("../assets/audio/img/audio_img9.jpg"),
    duration: "0:10",
  },
  {
    id: "10",
    name: "Lose Control",
    author: "Teddy Swims",
    img: require("../assets/audio/img/audio_img10.jpg"),
    duration: "1:05",
  },
];

export const data_filter = [
  {
    id: "1",
    name: "Glow Look",
    img: require("../assets/filter/img/filter_img1.jpg"),
  },
  {
    id: "2",
    name: "Green Screen",
    img: require("../assets/filter/img/filter_img2.jpg"),
  },
  {
    id: "3",
    name: "Portrait AI",
    img: require("../assets/filter/img/filter_img3.jpg"),
  },
  {
    id: "4",
    name: "Beauty Filter",
    img: require("../assets/filter/img/filter_img4.jpg"),
  },
  {
    id: "5",
    name: "Comic Face",
    img: require("../assets/filter/img/filter_img5.jpg"),
  },
  {
    id: "6",
    name: "Bling",
    img: require("../assets/filter/img/filter_img6.jpg"),
  },
  {
    id: "7",
    name: "Vintage Camera",
    img: require("../assets/filter/img/filter_img7.jpg"),
  },
  {
    id: "8",
    name: "Time Warp Scan",
    img: require("../assets/filter/img/filter_img8.jpg"),
  },
  {
    id: "9",
    name: "Shapeshifting",
    img: require("../assets/filter/img/filter_img9.jpg"),
  },
  {
    id: "10",
    name: "Dynamic Neon Glow",
    img: require("../assets/filter/img/filter_img10.jpg"),
  },
];
