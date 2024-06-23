import "./player.css";
import { Image, Text } from "@vkontakte/vkui";
import { Icon16MoreVertical } from "@vkontakte/icons";
import useSound from "use-sound";
import song from "../Player/anna-asti-po-baram.mp3";
import mock from './new_message-1.mp3'
import songImage from "./song-image.jpg";
import { observer } from "mobx-react-lite";
import playerController from './playerController';
import { useState, useEffect } from "react";

const PlayerComponent = observer(() => {
  const [play, { pause, duration, sound }] = useSound(mock, {
    onend: () => {
    playerController.setCurrTime(duration / 1000);
    playerController.setIsPlaying(false)
    },
  });

  playerController.setPlay(play, pause);

  useEffect(() => {
    if (duration && duration != null) playerController.setCurrTime(duration / 1000); 
  }, [duration]);

  useEffect(() => {
    let interval
    if (playerController.isPlaying && sound) {
      interval = setInterval(() => {
        if (sound) {
          playerController.setCurrTime(sound.seek());
          console.log(sound.seek())
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval); 
  }, [playerController.isPlaying, sound]);

  const togglePlay = () => {
    playerController.togglePlay();
    playerController.setCurrTime(sound.seek());
  };

  const currTime = playerController.currentTime;

  const minutes = Math.floor(currTime / 60);
  const seconds = Math.floor(currTime % 60);

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
        className="songImage"
        onClick={togglePlay}
      />
      <div className="playerName">
        <Text className="song">По барам</Text>
        <Text className="artist">Анна Асти</Text>
      </div>
      <Text className="time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <Icon16MoreVertical
        className="icon_more"
        width={8}
        height={26}
      ></Icon16MoreVertical>
    </div>
  );
});

export default PlayerComponent;
