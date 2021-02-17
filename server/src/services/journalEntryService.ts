import { JournalEntry, JournalEntryMongoModel } from '../models/journalEntryModel';

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export class JournalEntryService {
  /** Method gets all journal entries currently. */
  public get(userId: string, entryDate?: Date): Promise<JournalEntry[]> {
    if (!entryDate) {
      entryDate = new Date();
    }

    entryDate.setHours(0, 0, 0, 0);
    const endDate = addDays(entryDate, 1);

    console.log('start', entryDate.toISOString());
    console.log('end', endDate.toISOString());

    const filter = {
      userId: userId,
      date: { $lt: endDate.toISOString(), $gte: entryDate.toISOString() },
    };

    return JournalEntryMongoModel.findOne(filter)
      .limit(50)
      .then((entries: any) => {
        return entries;
      })
      .catch((err: any) => console.log(err));
  }

  public async update(userId: string, requestBody: any): Promise<any> {
    console.log('hey', requestBody);
    let entryDate = new Date(requestBody.date).setHours(0, 0, 0, 0);
    console.log('my userId', userId);
    console.log('entryDate', entryDate);

    const journalEntry = new JournalEntryMongoModel({
      date: entryDate,
      entries: requestBody.entries,
      userId: userId,
    });

    // filter by user and date by default to upsert
    let filter: any = { userId: userId, date: entryDate };

    // if there is an id on the record, use that for the upsert instead
    if (requestBody._id) {
      filter = { _id: requestBody._id };
      journalEntry._id = requestBody._id;
    }

    console.log('im using this filter', filter);

    try {
      const response = await JournalEntryMongoModel.updateOne(filter, journalEntry, { upsert: true });
      console.log(response);
      return response.ok > 0;
    } catch (e) {
      // TODO: how to handle error logging
      console.log(e);
      return false;
    }
  }
}
