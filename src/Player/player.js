import "./player.css";
import { Image, Text } from "@vkontakte/vkui";
import { Icon16MoreVertical } from "@vkontakte/icons";
import useSound from "use-sound";
import song from "../Player/anna-asti-po-baram.mp3";
import mock from "./new_message-1.mp3";
import songImage from "./song-image.jpg";
import { observer } from "mobx-react-lite";
import playerController from "./playerController";
import { useState, useEffect } from "react";

const PlayerComponent = observer(() => {
  const [realValue, setRealValue] = useState(0);
  const [outline, setOutline] = useState(false);
  const [play, { pause, duration, sound }] = useSound(song, {
    onend: () => {
      playerController.setCurrTime(realValue);
      playerController.setIsPlaying(false);
      setOutline(false); 
    },
    onload: () => {
      setRealValue(Math.round(duration / 1000));
    },
  });

  playerController.setPlay(play, pause);

  useEffect(() => {
    if (duration) playerController.setCurrTime(duration / 1000);
  }, [duration]);

  useEffect(() => {
    let interval;
    if (playerController.isPlaying && sound) {
      interval = setInterval(() => {
        if (sound) {
          playerController.setCurrTime(sound.seek());
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playerController.isPlaying, sound]);

  const currTime = playerController.currentTime;
  let minutes, seconds;
  if (currTime === 0) {
    minutes = Math.floor(duration / 1000 / 60);
    seconds = Math.floor((duration / 1000) % 60);
  } else {
    minutes = Math.floor(currTime / 60);
    seconds = Math.floor(currTime % 60);
  }

  return (
    <div className="songWrapper">
      <Image
        style={{
          marginTop: 9,
          marginBottom: 9,
          marginRight: 12,
          marginLeft: 16,
        }}
        src={songImage}
        alt="Заставка песни"
        borderRadius={"s"}
        size={40}
        onClick={() => {
          playerController.togglePlay();
          setOutline(!outline); // Toggle outline class on click
        }}
        className={`songImage ${outline ? "eye" : ""}`}
      >
        <div className="eye div_img"></div>
      </Image>
      <div className="playerName">
        <Text className="song">По барам</Text>
        <Text className="artist">Анна Асти</Text>
      </div>
      <Text className="time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <Icon16MoreVertical className="icon_more" width={8} height={26} />
    </div>
  );
});

export default PlayerComponent;
