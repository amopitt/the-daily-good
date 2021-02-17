import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { answerChanged } from '../store/journal-entry/actions';
import { IJournalEntry } from '../store/journal-entry/types';

interface IEntryDetailProps {
  journalEntry: IJournalEntry;
  onSave: (journalEntry: IJournalEntry) => any;
}

export const JournalEntryDetail: React.FC<IEntryDetailProps> = ({ journalEntry, onSave }) => {
  const dispatch = useDispatch();

  const [thisJournalEntry, setThisJournalEntry] = useState<IJournalEntry>(journalEntry);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    let newAnswer = e.target.value;
    const updatedJournalEntry = { ...thisJournalEntry };
    updatedJournalEntry.entries[questionIndex].answers[answerIndex] = newAnswer;
    setThisJournalEntry(updatedJournalEntry);

    // console.log(questionIndex, answerIndex, newAnswer);
    // dispatch(answerChanged(newAnswer, questionIndex, answerIndex));
  };

  useEffect(() => {
    setThisJournalEntry(journalEntry);
  }, [journalEntry]);

  console.log('this journal entry', thisJournalEntry);

  return (
    <div className={'journal-entry'}>
      <Form className="journal-entry-form">
        {/* <EntryDetailQuestions questions={journalEntry.entries} /> */}
        {thisJournalEntry.entries.map((e, questionIndex) => {
          return (
            <React.Fragment key={questionIndex}>
              <h2>{e.question}</h2>

              {e.answers.map((answer, answerIndex) => {
                return (
                  <Form.Group key={answerIndex}>
                    <Form.Row>
                      <Col sm="12">
                        <Form.Control
                          key={answerIndex}
                          type="text"
                          autoFocus={questionIndex === 0 && answerIndex === 0}
                          value={answer}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, questionIndex, answerIndex)}
                        />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                );
              })}
            </React.Fragment>
          );
        })}
      </Form>
      <Button onClick={() => onSave(thisJournalEntry)}>Save</Button>
      <br /> <br />
    </div>
  );
};
