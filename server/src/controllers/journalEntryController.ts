import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
  Response,
  SuccessResponse,
  Example,
  Delete,
  Patch,
  Tags,
  Request,
} from 'tsoa';
import { JournalEntry } from '../models/journalEntryModel';
import { JournalEntryService } from '../services/journalEntryService';

interface OktaRequest extends Express.Request {
  jwt: any;
}

@Route('journalentry')
@Tags('JournalEntries')
@Security('api_key')
export class JournalEntryController extends Controller {
  /**
   * Gets all entries right now, yolo style.
   *
   * @summary Get entries
   *
   */
  @Get('')
  // @Response<UnauthorizedError>(401, 'Unauthorized')
  // @Example<Entry>({
  //   _id: '52907745-7672-470e-a803-a2f8feb52944',
  //   first_name: 'joe',
  //   last_name: 'someone',
  // })
  public async getJournalEntries(@Request() request: OktaRequest): Promise<JournalEntry[]> {
    console.log('dta', request.jwt.claims.uid);

    return new JournalEntryService().get(request.jwt.claims.uid);
  }

  @Get('{selectedDate}')
  // @Response<UnauthorizedError>(401, 'Unauthorized')
  // @Example<Entry>({
  //   _id: '52907745-7672-470e-a803-a2f8feb52944',
  //   first_name: 'joe',
  //   last_name: 'someone',
  // })
  public async getJournalEntriesByDate(@Request() request: OktaRequest, selectedDate: string): Promise<JournalEntry[]> {
    console.log('dta', request.jwt.claims.uid);
    console.log('date', selectedDate);

    return new JournalEntryService().get(request.jwt.claims.uid, new Date(selectedDate));
  }

  @SuccessResponse('200', 'Updated')
  @Post('')
  public async Update(@Request() request: OktaRequest, @Body() journalEntry: JournalEntry): Promise<JournalEntry> {
    console.log('asdf!!', journalEntry);
    var response = await new JournalEntryService().update(request.jwt.claims.uid, journalEntry);
    return response;
  }
}
