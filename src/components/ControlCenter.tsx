import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'


import Icon from 'react-native-vector-icons/MaterialIcons'

import { playbackService } from '../../musicPlayerServices'

const ControlCenter = () => {

    const playBackState = usePlaybackState()
    // next button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }
    // Previous button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayback = async (playback: { state: State }) => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      console.log(currentTrack, playback);
    
      if (currentTrack !== null) {
        if (playback.state === State.Paused || playback.state === State.Ready) {
          await TrackPlayer.play();
          console.log('play');
        } else if (playback.state === State.Playing) {
          await TrackPlayer.pause();
          console.log('pause');
        }
      }
    };

  return (
    <View style={styles.container}>
        <Pressable onPress={skipToPrevious}>
            <Icon style={styles.icon} name="skip-previous" size={40} />
        </Pressable>
        <Pressable onPress={() => togglePlayback(playBackState)}>
            <Icon 
            style={styles.icon} 
            name={playBackState.state === State.Playing ? "pause" : "play-arrow"} 
            size={75} />
        </Pressable>
        <Pressable onPress={skipToNext}>
            <Icon style={styles.icon} name="skip-next" size={40} />
        </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#FFFFFF',
    },
    playButton: {
      marginHorizontal: 24,
    },
  });

export default ControlCenter