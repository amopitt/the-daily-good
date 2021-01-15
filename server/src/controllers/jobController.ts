import { Request, Response } from "express";
import axios from 'axios';
 
  
export const getJobs = async (req: Request, res: Response) => {
    try {
        console.log('ya dig');
      let { description = "", full_time, location = "", page = 1 } = req.query;
  
      description = description ? encodeURIComponent(description as string) : "";
      location = location ? encodeURIComponent(location as string) : "";
      full_time = full_time === "true" ? "&full_time=true" : "";
      if (page) {
        page = parseInt(page as string);
        page = isNaN(page) ? "" : `&page=${page}`;
      }
      const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${full_time}${page}`;
      const result = await axios.get(query);
      res.send(result.data);
    } catch (error) {
      res.status(400).send("Error while getting list of jobs.Try again later.");
    }
  }