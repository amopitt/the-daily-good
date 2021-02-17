import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { api } from '../config/';

import * as JournalEntryRedux from '../store/journal-entry/actions';
import { getCurrentJournalEntry } from '../store/journal-entry/selectors';
import { JournalEntryDetail } from './journal-entry-detail';
import { IJournalEntry } from '../store/journal-entry/types';
import { nav } from '..';
import { Button } from 'react-bootstrap';
import { Loading } from './loading';

interface IJournalEntryRouteParams {
  dateSelected?: string;
}

interface IJournalEntryProps extends RouteComponentProps<IJournalEntryRouteParams> {}

export const JournalEntry: React.FC<IJournalEntryProps> = ({ ...props }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentJournalEntry = useSelector(getCurrentJournalEntry, shallowEqual);
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const routeParams = props.match && props.match.params ? props.match.params : {};

  const [dateSelected, setDateSelected] = useState(
    routeParams.dateSelected ? new Date(routeParams.dateSelected) : new Date()
  );

  const history = useHistory();

  const onDateChanged = (date: Date) => {
    setIsLoading(true);
    nav('/history/' + date.toISOString());
  };

  const ExampleCustomInput: React.FC<any> = ({ value, onClick }) => (
    <Button variant="outline-primary" onClick={onClick}>
      {value}
    </Button>
  );

  const onSave = async (journalEntry: IJournalEntry) => {
    const accessToken = oktaAuth.getAccessToken();
    if (accessToken) {
      const options = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const updatedJournalEntry = await axios.post(`${api.baseUrl}/journalentry`, journalEntry, options);
      console.log(updatedJournalEntry);
      fetchEntries(accessToken, routeParams.dateSelected);
    }
  };

  const defaultQuestions = [
    'What was memorable yesterday?',
    'What are you grateful for today?',
    'What would make today great?',
  ];

  const getDefaultJournalEntry = (): IJournalEntry => {
    return {
      date: routeParams.dateSelected ? new Date(routeParams.dateSelected) : new Date(),
      entries: defaultQuestions.map((q) => {
        return {
          question: q,
          answers: ['', '', ''],
        };
      }),
    };
  };

  const fetchEntries = async (accessToken: string, selectedDate?: string) => {
    const entries = await axios.get(`${api.baseUrl}/journalentry` + (selectedDate ? `/${selectedDate}` : ''), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let journalEntry = entries.data;

    if (entries.data === '') {
      journalEntry = getDefaultJournalEntry();
    }

    dispatch(JournalEntryRedux.journalEntriesLoaded(journalEntry));
    setIsLoading(false);
  };

  useEffect(() => {
    const getEntries = async () => {
      const user = await oktaAuth.getUser();
      const accessToken = oktaAuth.getAccessToken();
      setCurrentUser(user);
      console.log('getDate', routeParams.dateSelected);
      if (authState.isAuthenticated && accessToken) {
        fetchEntries(accessToken, routeParams.dateSelected);
        console.log(accessToken);
      }
    };

    getEntries();
  }, [authState.isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (!currentJournalEntry || !currentJournalEntry.entries) {
    return <div>She broke</div>;
  }
  console.log('Journal Entry', currentJournalEntry);
  return (
    <div className="entry-container">
      <DatePicker
        selected={dateSelected}
        customInput={<ExampleCustomInput />}
        onChange={(date: any) => onDateChanged(date)}
      />
      <JournalEntryDetail journalEntry={currentJournalEntry} onSave={onSave} />
      {/* <div>
        Debugging:
        <pre>{JSON.stringify(currentJournalEntry, null, 2)}</pre>
      </div> */}
    </div>
  );
};
