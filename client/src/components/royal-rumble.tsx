import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Loading } from './loading';
import './royal-rumble.scss';
import vinceLogo from './vince_balls.gif';

const royalRumbleNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
const players = shuffle(['Sean', 'Benny', 'Flound', 'Mac', 'EdM000', 'Michel']);

function shuffle(array: any[]) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const RoyalRumble = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [thePlayers, setThePlayers] = useState<any>(players);
  const [currentPick, setCurrentPick] = useState<number>(0);
  const [descriptiveText, setDescriptiveText] = useState<string>("Let's get ready to Rumbleeeeeeee");
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(royalRumbleNumbers);

  const [selectedEntries, setSelectedEntries] = useState<any[]>(
    royalRumbleNumbers.map((value) => {
      return {
        currentEntry: value,
        owner: '',
      };
    })
  );

  const getRandomNumber = (maxNumber: number) => {
    return Math.floor(Math.random() * Math.floor(maxNumber));
  };

  const onSelectNumber = () => {
    if (availableNumbers.length === 0) {
      setDescriptiveText('All numbers have been drawn!');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const selectedNumber = getRandomNumber(availableNumbers.length - 1);
      const playerSelectingEntry = thePlayers[currentPick];

      console.log('It is ', playerSelectingEntry, ' turn!');
      console.log('Removing', availableNumbers[selectedNumber]);
      const numberPicked = availableNumbers[selectedNumber];
      setDescriptiveText(`${playerSelectingEntry} has drawn #${numberPicked}!`);
      setAvailableNumbers(
        availableNumbers.filter((a, index) => {
          return index !== selectedNumber;
        })
      );

      setSelectedEntries(
        selectedEntries.map((value, index) => {
          if (value.currentEntry === numberPicked) {
            console.log('found it');
            value.owner = playerSelectingEntry;
          }
          return value;
        })
      );
      let nextPick = currentPick + 1;
      if (nextPick === thePlayers.length) {
        nextPick = 0;
      }
      setCurrentPick(nextPick);
      setLoading(false);
    }, 3000);
  };

  if (loading) {
    return <img src={vinceLogo} />;
  }

  return (
    <div className="royal-rumble">
      <h2>{descriptiveText}</h2>
      <span>Order of picks:</span> {JSON.stringify(thePlayers)} <br />
      <span>Current pick:</span> {thePlayers[currentPick]}
      <br /> <br />
      <Button onClick={onSelectNumber}>Select an entry!</Button>
      <table className="royal-rumble-results">
        <tbody>
          {selectedEntries.map((entry, index) => (
            <tr key={index}>
              <td className="number">{entry.currentEntry}</td>
              <td className="owner">{entry.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* available numbers = {JSON.stringify(availableNumbers)}
      <br /> <br /> {JSON.stringify(selectedEntries)} */}
    </div>
  );
};
